"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationRouter = exports.userRouter = exports.authRouter = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var users_1 = require("./users");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var reservation_1 = require("./reservation");
Object.defineProperty(exports, "reservationRouter", { enumerable: true, get: function () { return __importDefault(reservation_1).default; } });
//# sourceMappingURL=index.js.map