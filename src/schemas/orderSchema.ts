import { z } from "zod"

export const createOrderSchema = z.object({
    body: z.object({
        table: z
            .coerce
            .number({ message: "The table number is required" })
            .int({ message: "The table number must be an integer" })
            .positive({ message: "The table number must be a positive number" }),
        name: z
            .string()
            .optional()
    })
})

export const addItemOrderSchema = z.object({
    body: z.object({
        order_id: z
            .string({ message: "The order_id must be a text!" })
            .min(1, { message: "The order_id is required" }),
        product_id: z
            .string({ message: "The product_id must be a text!" })
            .min(1, { message: "The product_id is required" }),
        amount: z.coerce
            .number({ message: "The amount is required" })
            .int({ message: "The amount must be an integer" })
            .positive({ message: "The amount must be a positive number" }),
    })
})

export const deleteItemOrderSchema = z.object({
    query: z.object({
        item_id: z
            .string({ message: "The item_id must be a text!" })
            .min(1, { message: "The item_id is required" })
    })
})

export const detailOrderSchema = z.object({
    query: z.object({
        order_id: z
            .string({ message: "The order_id must be a text!" })
            .min(1, { message: "The order_id is required" })
    })
})

export const sendOrderSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        order_id: z
            .string({ message: "The order_id must be a text!" })
            .min(1, { message: "The order_id is required" })
    })
})

export const finishOrderSchema = z.object({
    body: z.object({
        order_id: z
            .string({ message: "The order_id must be a text!" })
            .min(1, { message: "The order_id is required" })
    })
})

export const deleteOrderSchema = z.object({
    query: z.object({
        order_id: z
            .string({ message: "The order_id must be a text!" })
            .min(1, { message: "The order_id is required" })
    })
})