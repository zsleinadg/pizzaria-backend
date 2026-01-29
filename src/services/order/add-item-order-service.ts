import prismaClient from "../../prisma"


interface AddItemOrderProps {
    order_id: string,
    product_id: string,
    amount: number
}

class AddItemOrderService {
    async execute({ order_id, product_id, amount }: AddItemOrderProps) {
        try {
            const orderExists = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })

            if (!orderExists) {
                throw new Error("Order not found")
            }

            const productExists = await prismaClient.product.findFirst({
                where: {
                    id: product_id,
                    disabled: false
                }
            })

            if (!productExists) {
                throw new Error("Product not found")
            }
            const item = await prismaClient.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount: amount
                },
                select: {
                    amount: true,
                    id: true,
                    order_id: true,
                    product_id: true,
                    createdAt: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            description: true,
                            banner: true
                        }
                    }
                }
            })
            return item
        }
        catch (error) {
            throw new Error("Failed to add item to order")
        }
    }
}

export { AddItemOrderService }