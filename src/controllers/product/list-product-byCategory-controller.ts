import { Request, Response } from "express"
import { ListProductByCategoryService } from "../../services/product/list-product-byCategory-service"

class ListProductByCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string

        const listProductByCategoryService = new ListProductByCategoryService()

        const productsByCategory = await listProductByCategoryService.execute({
            category_id: category_id
        })
        res.status(200).json(productsByCategory)
    }
}

export { ListProductByCategoryController }