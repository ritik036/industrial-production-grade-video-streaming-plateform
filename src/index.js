import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("mongodb connection failed"));

console.log(process.env.PORT);

/*
import express from "express";

const app = express();

// app.listen()

(async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("error : ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log("app is listening on port", process.env.PORT);
    });
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
})();
*/
