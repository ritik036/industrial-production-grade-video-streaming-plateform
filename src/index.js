import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

connectDB();

console.log(process.env.PORT)


















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