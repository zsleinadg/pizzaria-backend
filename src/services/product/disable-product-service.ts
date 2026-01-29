import prismaClient from "../../prisma";

interface DisableProductProps {
    product_id: string
}

class DisableProductService {
    async execute({ product_id }: DisableProductProps) {
        try {
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
        catch (error) {
            throw new Error("Failed to disable product")
        }
    }
}

export { DisableProductService }