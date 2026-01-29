import prismaClient from "../../prisma"


interface DeleteOrderProps {
    order_id: string
}

class DeleteOrderService {
    async execute({ order_id }: DeleteOrderProps) {
        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id
            }
        })

        if (!order) {
            throw new Error("Order not found")
        }

        await prismaClient.order.delete({
            where: {
                id: order_id
            }
        })
        return { message: "Order successfully deleted" }
    }
}

export { DeleteOrderService }