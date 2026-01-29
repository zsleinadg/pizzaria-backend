import prismaClient from "../../prisma"


interface SendOrderProps {
    name?: string,
    order_id: string
}

class SendOrderService {
    async execute({ name, order_id }: SendOrderProps) {
        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id
            }
        })

        if (!order) {
            throw new Error("Order not found")
        }

        const updateOrder = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false,
                name: name
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
        return updateOrder
    }
}

export { SendOrderService }