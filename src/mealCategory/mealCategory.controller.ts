import { NextFunction, Request, Response } from "express";
import { MealCategoryDto } from "./mealCategory.dtos";
import { PostMealCategoryRequest } from "./mealCategory.interface";

import MealCategoryModel from "./mealCategory.model";
import MealModel from "../meal/meal.model";
import { MealDto } from "../meal/meal.dtos";

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

export async function getMealCategoriesList(req: Request<any>, res: Response) {
  try {
    MealCategoryModel.find().exec((_err, doc) => {
      const mealCategoriesList = doc.map((elem) => ({
        label: elem.name,
        value: elem._id,
      }));
      res.json({
        data: mealCategoriesList,
        totalCount: mealCategoriesList.length,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get meal categories",
    });
  }
}

export async function getMenu(req: Request<any>, res: Response) {
  try {
    const mealCategoriesWithMeals = await MealCategoryModel.aggregate([
      {
        $lookup: {
          from: "meals", // collection to join
          localField: "_id", // field from the input documents
          foreignField: "mealCategory_id", // field from the documents of the "from" collection
          as: "meals", // output array field
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          subMealCategoriesId: 1,
          order: 1,
          show: 1,
          meals: 1, // include the "meals" array
        },
      },
    ]);

    // Apply DTO transformations
    const formattedMealCategories = mealCategoriesWithMeals.map((category) => {
      const formattedMeals = category.meals.map((meal) => MealDto(meal));
      const formattedCategory = MealCategoryDto(category);
      return {
        ...formattedCategory,
        meals: formattedMeals,
      };
    });

    res.json({ data: formattedMealCategories });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get meal categories",
    });
  }
}

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

export async function postMealCategory(
  req: Request<any>,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const newMealCategory = req.body.data as PostMealCategoryRequest;
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

export async function updateMealCategory(req: Request<any>, res: Response) {
  try {
    const mealCategoryId = req.params.id;
    const updatedMealCategory = req.body.data as PostMealCategoryRequest;
    const result = await MealCategoryModel.updateOne(
      {
        _id: mealCategoryId,
      },
      updatedMealCategory
    );

    return res.json({ data: MealCategoryDto(result) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to update meal category",
    });
  }
}

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
