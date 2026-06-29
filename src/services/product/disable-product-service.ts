import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";

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

        if (product.banner) {
            console.log("Product banner URL:", product.banner)
            const publicId = this.extractPublicIdFromUrl(product.banner)
            console.log("Extracted publicId:", publicId)
            if (publicId) {
                try {
                    await cloudinary.uploader.destroy(publicId)
                } catch (error) {
                    console.error("Failed to delete image from Cloudinary:", error)
                }
            }
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

    private extractPublicIdFromUrl(url: string): string | null {
        try {
            const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/)
            if (!match || !match[1]) return null
            const withoutVersion: string = decodeURIComponent(match[1])
            const lastDotIndex = withoutVersion.lastIndexOf(".")
            return lastDotIndex !== -1 ? withoutVersion.substring(0, lastDotIndex) : withoutVersion
        } catch {
            return null
        }
    }
}

export { DisableProductService }