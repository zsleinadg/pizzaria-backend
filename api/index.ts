import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import router from "../src/routes"
import { Prisma } from "../src/generated/prisma/client"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof Prisma.PrismaClientInitializationError) {
        return res.status(503).json({ error: "Database connection failed." })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ error: "A database error occurred." })
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({ error: "Invalid data provided." })
    }
    if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error: "Internal server error!" })
})

export default app
