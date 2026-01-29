import { z } from "zod"

export const createCategorySchema = z.object({
    body: z.object({
        name: z
            .string({ message: "The category must be text" })
            .min(2, { message: "Category name must have at least 2 characters" })
    })
})