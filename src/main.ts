import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

declare global {
    interface CustomError extends Error {
        status?: number;
    }
}

app.use(
    (error: CustomError, req: Request, res: Response, next: NextFunction) => {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }

        return res.status(500).json({ message: "something went wrong" });
    }
);

const start = async () => {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");

    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log(err);
    }

    app.listen(8000, () =>
        console.log("server is up and running on port 8000")
    );
    console.log("started");
};

start();
