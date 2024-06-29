"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
        default: "guest",
    },
    avatarUrl: String,
    isActivated: {
        type: Boolean,
        default: false,
    },
    language: {
        type: String,
        enum: ["en", "ua", "cz"],
        default: "en",
    },
}, {
    timestamps: true,
});
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map