import { Request, Response } from "express"
import { DeleteOrderService } from "../../services/order/delete-order-service"

class DeleteOrderController {
    async handle(req: Request, res: Response) {
        const order_id = req.query?.order_id as string

        const deleteOrderService = new DeleteOrderService()

        const deleteOrder = await deleteOrderService.execute({
            order_id: order_id
        })

        res.status(200).json(deleteOrder)
    }
}

export { DeleteOrderController }
