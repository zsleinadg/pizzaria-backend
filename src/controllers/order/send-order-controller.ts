import { Request, Response } from "express"
import { SendOrderService } from "../../services/order/send-order-service"

class SendOrderController {
    async handle(req: Request, res: Response) {
        const { order_id, name } = req.body

        const sendOrderService = new SendOrderService()

        const sendOrder = await sendOrderService.execute({
            order_id: order_id,
            name: name
        })
        res.status(200).json(sendOrder)
    }
}

export { SendOrderController }