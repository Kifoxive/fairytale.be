"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironment = exports.Environment = void 0;
var Environment;
(function (Environment) {
    Environment["DEV"] = "development";
    Environment["PROD"] = "production";
})(Environment = exports.Environment || (exports.Environment = {}));
const getEnvironment = () => {
    if (process.env.ENVIRONMENT === "development" ||
        process.env.QLSTATE === "development" ||
        process.env.ENVIROMENT === "development")
        return Environment.DEV;
    if (process.env.ENVIRONMENT === "production" ||
        process.env.QLSTATE === "production" ||
        process.env.ENVIROMENT === "production")
        return Environment.PROD;
    console.warn("Unknown environment, defaulting to development");
    return Environment.DEV;
};
exports.getEnvironment = getEnvironment;
//# sourceMappingURL=getEnvironment.js.map