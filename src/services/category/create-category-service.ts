import prismaClient from "../../prisma"


interface CreateCategoryProps {
    name: string
}

class CreateCategoryService {
    async execute({ name }: CreateCategoryProps) {

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        if (categoryAlreadyExists) {
            throw new Error("This category has already been registered!")
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                name: true,
                id: true,
                createdAt: true
            }
        })

        return category

    }
}

export { CreateCategoryService }