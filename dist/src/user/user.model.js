"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: String,
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "guest"],
        // required: true,
        // default: AUTH_ROLE["guest"],
        default: "guest",
    },
    avatarUrl: String,
    isActivated: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map