import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const dataLimit = "1024kb";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: dataLimit,
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: dataLimit,
  })
);

app.use(express.static("public"));

export { app };
