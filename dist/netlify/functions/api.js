"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = __importDefault(require("src/app"));
const handler = async (event, context) => {
    // you can do other things here
    await mongoose_1.default
        .connect(process.env.DB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to database"));
    const result = await (0, serverless_http_1.default)(app_1.default)(event, context);
    // and here
    return result;
};
exports.handler = handler;
//# sourceMappingURL=api.js.map