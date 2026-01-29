import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/create-category-service";

class CreateCategoryController {
    async handle(req: Request, res: Response) {

        const { name } = req.body

        const createCategoryService = new CreateCategoryService()

        const category = await createCategoryService.execute({
            name: name
        })

        res.status(201).json(category)
    }
}

export { CreateCategoryController }