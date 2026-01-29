import { Request, Response } from "express"
import { FinishOrderService } from "../../services/order/finish-order-service"


class FinishOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body

        const finishOrderService = new FinishOrderService()

        const finishOrder = await finishOrderService.execute({
            order_id: order_id,
        })
        res.status(200).json(finishOrder)
    }
}

export { FinishOrderController }