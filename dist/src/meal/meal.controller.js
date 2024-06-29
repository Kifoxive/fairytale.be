"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMealFile = exports.updateMeal = exports.postMeal = exports.getOneMeal = exports.getAllMeals = void 0;
const meal_dtos_1 = require("./meal.dtos");
const meal_model_1 = __importDefault(require("./meal.model"));
const services_1 = require("../services");
async function getAllMeals(req, res) {
    try {
        const limit = req.query.limit || 40;
        const offset = req.query.offset || 0;
        meal_model_1.default.find()
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
        meal_model_1.default.findOne({
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
        const doc = new meal_model_1.default(newMeal);
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
        const result = await meal_model_1.default.updateOne({
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
        await meal_model_1.default.updateOne({
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
//# sourceMappingURL=meal.controller.js.map