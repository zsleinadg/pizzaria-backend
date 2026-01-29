import { Request, Response } from "express"
import { DisableProductService } from "../../services/product/disable-product-service"

class DisableProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query?.product_id as string

        const disableProductService = new DisableProductService()

        const disableProduct = await disableProductService.execute({
            product_id: product_id
        })
        res.status(200).json(disableProduct)
    }
}

export { DisableProductController }