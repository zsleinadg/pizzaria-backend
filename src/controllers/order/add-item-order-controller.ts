import { Request, Response } from "express"
import { AddItemOrderService } from "../../services/order/add-item-order-service"

class AddItemOrderController {
    async handle(req: Request, res: Response) {
        const { order_id, product_id, amount } = req.body

        const addItemOrderService = new AddItemOrderService()

        const addItem = await addItemOrderService.execute({
            order_id: order_id,
            product_id: product_id,
            amount: amount
        })
        res.status(200).json(addItem)
    }
}

export { AddItemOrderController }