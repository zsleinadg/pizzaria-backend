import prismaClient from "../../prisma"


interface DeleteItemOrderProps {
    item_id: string
}

class DeleteItemOrderService {
    async execute({ item_id }: DeleteItemOrderProps) {

        const itemExists = await prismaClient.item.findFirst({
            where: {
                id: item_id
            }
        })

        if (!itemExists) {
            throw new Error("Item not found")
        }

        await prismaClient.item.delete({
            where: {
                id: item_id
            }
        })
        return { message: "Item successfully deleted" }

    }
}

export { DeleteItemOrderService }