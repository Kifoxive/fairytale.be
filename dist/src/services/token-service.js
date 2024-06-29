"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findToken = exports.removeToken = exports.saveToken = exports.validateRefreshToken = exports.validateAccessToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = __importDefault(require("../auth/auth.model"));
function generateTokens(payload) {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "30m",
        // expiresIn: "10s",
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
    });
    return {
        accessToken,
        refreshToken,
    };
}
exports.generateTokens = generateTokens;
function validateAccessToken(token) {
    try {
        const userData = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        return userData;
    }
    catch (e) {
        return null;
    }
}
exports.validateAccessToken = validateAccessToken;
function validateRefreshToken(token) {
    try {
        const userData = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        return userData;
    }
    catch (e) {
        return null;
    }
}
exports.validateRefreshToken = validateRefreshToken;
async function saveToken(userId, refreshToken) {
    const tokenData = await auth_model_1.default.findOne({ userId });
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = auth_model_1.default.create({ user: userId, refreshToken });
    return token;
}
exports.saveToken = saveToken;
async function removeToken(refreshToken) {
    const tokenData = await auth_model_1.default.deleteOne({ refreshToken });
    return tokenData;
}
exports.removeToken = removeToken;
async function findToken(refreshToken) {
    const tokenData = await auth_model_1.default.findOne({ refreshToken });
    return tokenData;
}
exports.findToken = findToken;
//# sourceMappingURL=token-service.js.map