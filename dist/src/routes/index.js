"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealCategoryController = exports.mealController = exports.reservationRouter = exports.userRouter = exports.authRouter = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var users_1 = require("./users");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var reservation_1 = require("./reservation");
Object.defineProperty(exports, "reservationRouter", { enumerable: true, get: function () { return __importDefault(reservation_1).default; } });
var meal_1 = require("./meal");
Object.defineProperty(exports, "mealController", { enumerable: true, get: function () { return __importDefault(meal_1).default; } });
var mealCategory_1 = require("./mealCategory");
Object.defineProperty(exports, "mealCategoryController", { enumerable: true, get: function () { return __importDefault(mealCategory_1).default; } });
//# sourceMappingURL=index.js.map