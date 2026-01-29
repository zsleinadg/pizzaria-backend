import { Request, Response } from "express"
import { DeleteItemOrderService } from "../../services/order/delete-item-order-service"

class DeleteItemOrderController {
    async handle(req: Request, res: Response) {
        const item_id = req.query.item_id as string

        const deleteItemOrderService = new DeleteItemOrderService()

        const deleteItem = await deleteItemOrderService.execute({
            item_id: item_id
        })
        res.status(200).json(deleteItem)
    }
}

export { DeleteItemOrderController }