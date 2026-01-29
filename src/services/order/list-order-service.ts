import prismaClient from "../../prisma"

interface ListOrderProps {
    draft?: string
}

class ListOrderService {
    async execute({ draft }: ListOrderProps) {

        const order = await prismaClient.order.findMany({
            where: {
                draft: draft === "true" ? true : false
            },
            select: {
                id: true,
                name: true,
                table: true,
                status: true,
                draft: true,
                createdAt: true,
                items: {
                    select: {
                        id: true,
                        amount: true,
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

        return order
    }
}

export { ListOrderService }