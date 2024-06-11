import mongoose from "mongoose";
import app from "./src/app";
// import { PORT } from "./v3/config/constants";

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to database"));
    app.listen(PORT, function () {
      console.log("Started application on port %d", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
