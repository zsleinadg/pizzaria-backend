import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";
import { Prisma } from "./generated/prisma/client";

process.on("uncaughtException", (error) => {
    console.error("UNCAUGHT EXCEPTION:", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof Prisma.PrismaClientInitializationError) {
        return res.status(503).json({
            error: "Database connection failed. Check your database credentials."
        })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
            error: "A database error occurred. Please try again."
        })
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({
            error: "Invalid data provided."
        })
    }

    if (error instanceof Error) {
        return res.status(400).json({
            error: error.message
        })
    }

    return res.status(500).json({
        error: "Internal server error!"
    })
})

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

console.log(`Starting server on port ${PORT}...`);

try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
}