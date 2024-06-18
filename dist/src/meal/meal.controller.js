"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMealFile = exports.updateMeal = exports.postMeal = exports.getOneMeal = exports.getAllMeals = void 0;
const meal_dtos_1 = require("./meal.dtos");
const meal_model_1 = require("./meal.model");
const services_1 = require("../services");
async function getAllMeals(req, res) {
    try {
        const limit = req.query.limit || 40;
        const offset = req.query.offset || 0;
        meal_model_1.MealModel.find()
            .skip(limit * offset)
            .limit(limit)
            .exec((_err, doc) => {
            const meals = doc.map((elem) => (0, meal_dtos_1.MealDto)(elem));
            res.json({ data: meals, totalCount: meals.length });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get meal",
        });
    }
}
exports.getAllMeals = getAllMeals;
async function getOneMeal(req, res) {
    try {
        const mealId = req.params.id;
        meal_model_1.MealModel.findOne({
            _id: mealId,
        }).exec((err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Failed to get the meal",
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: "The meal did not found",
                });
            }
            const mealDto = (0, meal_dtos_1.MealDto)(doc);
            res.json({ data: mealDto });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get the meal",
        });
    }
}
exports.getOneMeal = getOneMeal;
async function postMeal(req, res, next) {
    try {
        const newMeal = req.body.data;
        const doc = new meal_model_1.MealModel(newMeal);
        const result = await doc.save();
        return res.json({ data: (0, meal_dtos_1.MealDto)(result) });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to create meal",
        });
    }
}
exports.postMeal = postMeal;
async function updateMeal(req, res) {
    try {
        const mealId = req.params.id;
        const updatedMeal = req.body.data;
        const result = await meal_model_1.MealModel.updateOne({
            _id: mealId,
        }, updatedMeal);
        return res.json({ data: (0, meal_dtos_1.MealDto)(result) });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to update meal category",
        });
    }
}
exports.updateMeal = updateMeal;
async function uploadMealFile(req, res) {
    try {
        const body = { ...req.body };
        const directory = body.directory;
        const mealId = body.id;
        const fullPath = `${directory}/${mealId}`;
        const file = { ...req.files }.file;
        const croppedImage = await (0, services_1.cropImageService)(file);
        const fileUrl = await (0, services_1.uploadFileService)(croppedImage, fullPath);
        await meal_model_1.MealModel.updateOne({
            _id: mealId,
        }, { imgUrl: fileUrl });
        return res.status(200).json({ fileUrl });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to upload a file",
        });
    }
}
exports.uploadMealFile = uploadMealFile;
// export async function getAllReservations(req: Request<any>, res: Response) {
//   try {
//     const limit = (req.query.limit as unknown as number) || 40;
//     const offset = (req.query.offset as unknown as number) || 0;
//     ReservationModel.find()
//       .skip(limit * offset)
//       .limit(limit)
//       .exec((err, doc) => {
//         const reservations = doc.map((elem) => ReservationDto(elem));
//         res.json({ data: reservations, totalCount: reservations.length });
//       });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Failed to get reservations",
//     });
//   }
// }
//   async getMine(req, res) {
//     try {
//       const userId = req.userId;
//       await ReservationModel.find({ user: userId })
//         .sort({ createdAt: -1 })
//         .populate("user")
//         .populate("selectedProducts")
//         .exec((err, doc) => {
//           const posts = doc.map((elem) => {
//             return new PostDto(elem);
//           });
//           res.json({ posts });
//         });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "failed to get posts" });
//     }
//   }
//   async getOne(req, res) {
//     try {
//       const postId = req.params.id;
//       ReservationModel.findOneAndUpdate(
//         {
//           _id: postId,
//         },
//         {
//           $inc: {
//             viewsCount: 1,
//           },
//         },
//         {
//           returnDocument: "after",
//         }
//       )
//         .populate("user")
//         .populate("selectedProducts")
//         .exec((err, doc) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).json({
//               message: "Failed to get the post",
//             });
//           }
//           if (!doc) {
//             return res.status(404).json({
//               message: "The post did not found",
//             });
//           }
//           const postDto = new PostDto(doc);
//           res.json(postDto);
//         });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Failed to get the post",
//       });
//     }
//   }
// export async function changeReservationStatus(
//   req: Request<any>,
//   res: Response
// ) {
//   try {
//     const { reservation_id, status } = req.body.data as {
//       reservation_id: string;
//       status: RESERVATION_STATUS;
//     };
//     const reservation = await ReservationModel.updateOne(
//       {
//         _id: reservation_id,
//       },
//       {
//         status: RESERVATION_STATUS[status],
//       }
//     );
//     res.json({ data: reservation });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Failed to approve the reservation",
//     });
//   }
// }
//   async remove(req, res) {
//     try {
//       const postId = req.params.id;
//       const userId = req.userId;
//       ReservationModel.findOneAndDelete(
//         {
//           _id: postId,
//         },
//         (err, doc) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).json({
//               message: "Failed to delete the post ",
//             });
//           }
//           if (!doc) {
//             return res.status(404).json({
//               message: "The post did not found",
//             });
//           }
//           res.json({ success: true });
//         }
//       );
//       // decrement users products count
//       await UserModel.updateOne(
//         {
//           _id: userId,
//         },
//         {
//           $inc: {
//             postsCount: -1,
//           },
//         }
//       );
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Failed to remove the post",
//       });
//     }
//   }
//# sourceMappingURL=meal.controller.js.map