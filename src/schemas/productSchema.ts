import { z } from "zod"

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "Product name is required!" }),
        price: z.string().min(1, { message: "Product price is required!" }).regex(/^\d+$/),
        description: z.string().min(1, { message: "Product description is required!" }),
        category_id: z.string({ message: "Product category is required!" }),
    })
})

export const listProductSchema = z.object({
    query: z.object({
        disabled: z.enum(["true", "false"], { message: "..." })
            .optional()
            .default("false")
            .transform((val) => val === "true")
    })
})

export const listProductByCategorySchema = z.object({
    query: z.object({
        category_id: z.string({ message: "The category_id is required!" })
    })
})

export const disableProductSchema = z.object({
    query: z.object({
        product_id: z.string({ message: "The product_id is required!" })
    })
})
