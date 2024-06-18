"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config.js");
const routes_1 = require("./routes");
const getEnvironment_1 = require("./utils/getEnvironment");
const middleware_1 = require("./middleware");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["https://fairytale-fe.netlify.app/", "http://localhost:5173"],
    optionsSuccessStatus: 200,
    credentials: true,
};
const corsOptionsDev = {
    origin: ["https://fairytale-fe.netlify.app/", "http://localhost:5173"],
    credentials: true,
};
// setting middleware
if (process.env.QLSTATE == "production") {
    app.use((0, cors_1.default)(corsOptions));
}
else {
    app.use((0, cors_1.default)(corsOptionsDev));
}
app.use(helmet_1.default.hsts({
    maxAge: 5184000,
}));
app.use((0, express_fileupload_1.default)({
    createParentPath: true,
}));
// app.use(express.urlencoded({extended: true}))
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("[:date[iso]] :status :method :url :res[content-length] - :response-time ms"));
app.use(middleware_1.errorMiddleware);
// routes
app.use("/api/auth", routes_1.authRouter);
app.use("/api/user", routes_1.userRouter);
app.use("/api/reservation", routes_1.reservationRouter);
app.use("/api/meal", routes_1.mealController);
app.use("/api/meal-category", routes_1.mealCategoryController);
//? middleware to log all 500 requests into google cloud
// app.use(errorLogger);
process.on("unhandledRejection", (error, promise) => {
    console.log("Oh Lord! We forgot to handle a promise rejection here: ", promise);
    console.log("The error was: ", error);
});
if ((0, getEnvironment_1.getEnvironment)() === getEnvironment_1.Environment.DEV) {
    //generate swagger docs
    //   generateSwaggerJson()
    //     .then(() => {
    //       app.use(
    //         "/docs",
    //         swaggerUi.serve,
    //         swaggerUi.setup(require(`./middleware/swagger-output.json`))
    //       );
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
}
exports.default = app;
//# sourceMappingURL=app.js.map