import prismaClient from "../../prisma";

interface DisableProductProps {
    product_id: string
}

class DisableProductService {
    async execute({ product_id }: DisableProductProps) {
        const product = await prismaClient.product.findUnique({
            where: { id: product_id }
        })

        if (!product) {
            throw new Error("Product not found")
        }

        await prismaClient.product.update({
            where: {
                id: product_id
            },
            data: {
                disabled: true
            }
        })
        return { message: "Product successfully disabled" }
    }
}

export { DisableProductService }