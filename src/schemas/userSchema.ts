import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(3, { message: "Name must be at least 3 characters long" }),

        email: z
            .string()
            .email({ message: "Invalid email" }),

        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" }),
    })
})

export const authUserSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email({ message: "Invalid email" }),

        password: z.
            string({ message: "The password is required!" })
    })
})