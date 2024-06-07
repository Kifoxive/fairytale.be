import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import "dotenv/config.js";
import { reservationRouter, userRouter, authRouter } from "./routes";
import { Environment, getEnvironment } from "./utils/getEnvironment";
import { errorMiddleware } from "./middleware";

const app = express();

const corsOptions = {
  origin: [],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const corsOptionsDev = {
  origin: ["http://localhost:5173"],
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
