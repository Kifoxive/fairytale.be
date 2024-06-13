import mongoose from "mongoose";
import serverless from "serverless-http";
import app from "src/app";

const PORT = process.env.PORT || 3000;

// export const handler = serverless(async () => {
//   await mongoose
//     .connect(process.env.DB_URL, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     })
//     .then(() => console.log("Connected to database"));
//   app.listen(PORT, function () {
//     console.log("Started application on port %d", PORT);
//   });
//   return app;
// });

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
