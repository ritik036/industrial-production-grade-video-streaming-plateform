import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// const dataLimit = "1024kb";

const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(
    express.json({
        limit: "16kb",
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

app.use(express.static("public"));
app.use(cookieParser());

// Routes import :-
import userRouter from "./routes/user.routes.js";


// Routes declaration :-
app.use("/api/v1/users", userRouter, )
// standard practice is to descripe api and versioning of it. 


export { app };
