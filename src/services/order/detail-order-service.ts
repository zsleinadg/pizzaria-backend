import prismaClient from "../../prisma"


interface DetailOrderProps {
    order_id: string
}

class DetailOrderService {
    async execute({ order_id }: DetailOrderProps) {

        const orderExists = await prismaClient.order.findFirst({
            where: {
                id: order_id
            }
        })
        if (!orderExists) {
            throw new Error("Order not found")
        }

        const orderDetail = await prismaClient.order.findFirst({
            where: {
                id: order_id
            },
            select: {
                table: true,
                name: true,
                id: true,
                status: true,
                draft: true,
                createdAt: true,
                updatedAt: true,
                items: {
                    select: {
                        id: true,
                        amount: true,
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
                }
            }
        })
        return orderDetail
    }
}

export { DetailOrderService }