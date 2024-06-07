"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
function errorMiddleware(err, req, res, next) {
    console.log(err.message);
    if (err instanceof exceptions_1.ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: err.message });
}
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map