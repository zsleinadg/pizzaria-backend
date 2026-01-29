import {Request, Response} from "express"
import { ListOrderService } from "../../services/order/list-order-service"

class ListOrderController{
    async handle(req: Request, res: Response){
        const draft = req.query?.draft as string

        const listOrderService = new ListOrderService()

        const order = await listOrderService.execute({draft})

        return res.status(200).json(order)
    }
}

export {ListOrderController
}