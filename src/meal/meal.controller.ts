import { NextFunction, Request, Response } from "express";
import { MealDto } from "./meal.dtos";
import { PostMealRequest } from "./meal.interface";
import MealModel from "./meal.model";
import { Schema } from "mongoose";

import { cropImageService, uploadFileService } from "../services";
import { UploadedFile } from "express-fileupload";

export async function getAllMeals(req: Request<any>, res: Response) {
  try {
    const limit = (req.query.limit as unknown as number) || 40;
    const offset = (req.query.offset as unknown as number) || 0;

    MealModel.find()
      .skip(limit * offset)
      .limit(limit)
      .exec((_err, doc) => {
        const meals = doc.map((elem) => MealDto(elem));
        res.json({ data: meals, totalCount: meals.length });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get meal",
    });
  }
}

export async function getOneMeal(req: Request<any>, res: Response) {
  try {
    const mealId = req.params.id;
    MealModel.findOne({
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
      const mealDto = MealDto(doc);
      res.json({ data: mealDto });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get the meal",
    });
  }
}

export async function postMeal(
  req: Request<any>,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const newMeal = req.body.data as PostMealRequest;
    const doc = new MealModel(newMeal);
    const result = await doc.save();

    return res.json({ data: MealDto(result) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to create meal",
    });
  }
}

export async function updateMeal(req: Request<any>, res: Response) {
  try {
    const mealId = req.params.id;
    const updatedMeal = req.body.data as PostMealRequest;
    const result = await MealModel.updateOne(
      {
        _id: mealId,
      },
      updatedMeal
    );

    return res.json({ data: MealDto(result) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to update meal category",
    });
  }
}

export async function uploadMealFile(req: Request<any>, res: Response) {
  try {
    const body = { ...req.body };

    const directory: "/meal" = body.directory;
    const mealId: Schema.Types.ObjectId = body.id;
    const fullPath = `${directory}/${mealId}`;

    const file = { ...req.files }.file as UploadedFile;

    const croppedImage = await cropImageService(file);
    const fileUrl = await uploadFileService(croppedImage, fullPath);

    await MealModel.updateOne(
      {
        _id: mealId,
      },
      { imgUrl: fileUrl }
    );

    return res.status(200).json({ fileUrl });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to upload a file",
    });
  }
}
