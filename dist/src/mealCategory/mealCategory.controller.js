"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMealCategory = exports.postMealCategory = exports.getOneMealCategory = exports.getMealCategoriesList = exports.getAllMealCategories = void 0;
const mealCategory_dtos_1 = require("./mealCategory.dtos");
const mealCategory_model_1 = __importDefault(require("./mealCategory.model"));
async function getAllMealCategories(req, res) {
    try {
        const limit = req.query.limit || 40;
        const offset = req.query.offset || 0;
        mealCategory_model_1.default.find()
            .skip(limit * offset)
            .limit(limit)
            .exec((_err, doc) => {
            const mealCategories = doc.map((elem) => (0, mealCategory_dtos_1.MealCategoryDto)(elem));
            res.json({ data: mealCategories, totalCount: mealCategories.length });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get meal categories",
        });
    }
}
exports.getAllMealCategories = getAllMealCategories;
async function getMealCategoriesList(req, res) {
    try {
        mealCategory_model_1.default.find().exec((_err, doc) => {
            const mealCategoriesList = doc.map((elem) => ({
                label: elem.name,
                value: elem._id,
            }));
            res.json({
                data: mealCategoriesList,
                totalCount: mealCategoriesList.length,
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get meal categories",
        });
    }
}
exports.getMealCategoriesList = getMealCategoriesList;
async function getOneMealCategory(req, res) {
    try {
        const mealCategoryId = req.params.id;
        mealCategory_model_1.default.findOne({
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
            const mealCategoryDto = (0, mealCategory_dtos_1.MealCategoryDto)(doc);
            res.json({ data: mealCategoryDto });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get the meal category",
        });
    }
}
exports.getOneMealCategory = getOneMealCategory;
async function postMealCategory(req, res, next) {
    try {
        const newMealCategory = req.body.data;
        const doc = new mealCategory_model_1.default(newMealCategory);
        const result = await doc.save();
        return res.json({ data: (0, mealCategory_dtos_1.MealCategoryDto)(result) });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to create meal category",
        });
    }
}
exports.postMealCategory = postMealCategory;
async function updateMealCategory(req, res) {
    try {
        const mealCategoryId = req.params.id;
        const updatedMealCategory = req.body.data;
        const result = await mealCategory_model_1.default.updateOne({
            _id: mealCategoryId,
        }, updatedMealCategory);
        return res.json({ data: (0, mealCategory_dtos_1.MealCategoryDto)(result) });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to update meal category",
        });
    }
}
exports.updateMealCategory = updateMealCategory;
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
//# sourceMappingURL=mealCategory.controller.js.map