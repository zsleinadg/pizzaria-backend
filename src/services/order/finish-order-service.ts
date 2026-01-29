import prismaClient from "../../prisma"


interface FinishOrderProps {
    order_id: string
}

class FinishOrderService {
    async execute({ order_id }: FinishOrderProps) {
        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id
            }
        })

        if (!order) {
            throw new Error("Order not found")
        }

        const finishOrder = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true
            },
            select: {
                id: true,
                name: true,
                table: true,
                draft: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return finishOrder
    }
}

export { FinishOrderService }