import { NextFunction, Request, Response } from "express";
import { MealCategoryDto } from "./mealCategory.dtos";
import { PostMealCategory } from "./mealCategory.interface";

import MealCategoryModel from "./mealCategory.model";

export async function postMealCategory(
  req: Request<any>,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const newMealCategory = req.body.data as PostMealCategory["request"];
    const doc = new MealCategoryModel(newMealCategory);
    const result = await doc.save();

    return res.json({ data: MealCategoryDto(result) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to create meal category",
    });
  }
}

export async function getAllMealCategories(req: Request<any>, res: Response) {
  try {
    const limit = (req.query.limit as unknown as number) || 40;
    const offset = (req.query.offset as unknown as number) || 0;

    MealCategoryModel.find()
      .skip(limit * offset)
      .limit(limit)
      .exec((_err, doc) => {
        const mealCategories = doc.map((elem) => MealCategoryDto(elem));
        res.json({ data: mealCategories, totalCount: mealCategories.length });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get meal categories",
    });
  }
}

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

export async function getOneMealCategory(req: Request<any>, res: Response) {
  try {
    const mealCategoryId = req.params.id;
    MealCategoryModel.findOne({
      _id: mealCategoryId,
    }).exec((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Failed to get the meal category",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: "The meal category did not found",
        });
      }
      const mealCategoryDto = MealCategoryDto(doc);
      res.json({ data: mealCategoryDto });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get the meal category",
    });
  }
}

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
