import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import "dotenv/config.js";
import {
  reservationRouter,
  userRouter,
  authRouter,
  mealController,
  mealCategoryController,
} from "./routes";
import { Environment, getEnvironment } from "./utils/getEnvironment";
import { errorMiddleware } from "./middleware";
import fileUpload from "express-fileupload";

const app = express();

const corsOptions = {
  origin: ["https://fairytale-fe.netlify.app"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const corsOptionsDev = {
  origin: ["https://fairytale-fe.netlify.app", "http://localhost:5173"],
  credentials: true,
};

// setting middleware
if (process.env.QLSTATE == "production") {
  app.use(cors(corsOptions));
} else {
  app.use(cors(corsOptionsDev));
}
app.use(
  helmet.hsts({
    maxAge: 5184000,
  })
);
app.use(
  fileUpload({
    createParentPath: true,
  })
);
// app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());
app.use(
  morgan(
    "[:date[iso]] :status :method :url :res[content-length] - :response-time ms"
  )
);
app.use(errorMiddleware);

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/meal", mealController);
app.use("/api/meal-category", mealCategoryController);
// app.get("/fullLogo", (req, res) => {
//   res.sendFile("./assets/fullLogo.png", { root: __dirname });
// });
app.use("/", express.static("assets"));

//? middleware to log all 500 requests into google cloud
// app.use(errorLogger);

process.on("unhandledRejection", (error, promise) => {
  console.log(
    "Oh Lord! We forgot to handle a promise rejection here: ",
    promise
  );
  console.log("The error was: ", error);
});

if (getEnvironment() === Environment.DEV) {
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

export default app;
