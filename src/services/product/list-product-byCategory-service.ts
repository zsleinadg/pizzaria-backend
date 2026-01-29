import prismaClient from "../../prisma"


interface ListProductByCategoryProps {
    category_id?: string
}

class ListProductByCategoryService {
    async execute({ category_id }: ListProductByCategoryProps) {
        try {
            const products = await prismaClient.product.findMany({
                where: {
                    category_id: category_id,
                    disabled: false
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    disabled: true,
                    category_id: true,
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
            return products
        }
        catch (error) {
            throw new Error("Failed to search the category products")
        }
    }
}

export { ListProductByCategoryService }