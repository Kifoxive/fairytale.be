import mongoose from "mongoose";
import serverless from "serverless-http";
import app from "src/app";

export const handler = async (event, context) => {
  // you can do other things here
  await mongoose
    .connect(process.env.DB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"));
  const result = await serverless(app)(event, context);
  // and here
  return result;
};
