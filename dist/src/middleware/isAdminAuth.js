"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_service_1 = require("../services/token-service");
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const user_interface_1 = require("../user/user.interface");
function isAdminAuth(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(api_error_1.default.UnauthorizedError());
        }
        const accessToken = authorizationHeader.replace(/Bearer\s?/, "");
        if (!accessToken) {
            return next(api_error_1.default.UnauthorizedError());
        }
        const userData = (0, token_service_1.validateAccessToken)(accessToken);
        if (!userData) {
            return next(api_error_1.default.UnauthorizedError());
        }
        if (userData.role !== user_interface_1.AUTH_ROLE["admin"]) {
            return next(api_error_1.default.Forbidden());
        }
        req.headers.authorization = userData.user_id;
        next();
    }
    catch (e) {
        return next(api_error_1.default.UnauthorizedError());
    }
}
exports.default = isAdminAuth;
//# sourceMappingURL=isAdminAuth.js.map