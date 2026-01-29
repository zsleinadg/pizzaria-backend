import { Request, Response, NextFunction } from "express"
import prismaClient from "../prisma"

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id

    if (!user_id) {
        res.status(401).json({ error: "User without permission" })
        return
    }

    const user = await prismaClient.user.findFirst({
        where: {
            id: user_id
        }
    })

    if (!user || user.role !== "ADMIN") {
        res.status(401).json({ error: "User without permission" })
        return
    }

    return next()
}