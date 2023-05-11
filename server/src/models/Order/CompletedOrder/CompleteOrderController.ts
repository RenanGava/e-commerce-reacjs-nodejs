import { Request, Response } from "express";
import { CompleteOrderUseCase } from "./CompleteOrderUseCase";



class CompleteOrderController {

    async handle(request: Request, response: Response) {
        const { order_id } = request.body


        const completeOrderUseCase = new CompleteOrderUseCase()
        const orderComplete = await completeOrderUseCase.execute({ order_id })

        return response.status(200).json(orderComplete)
    }
}

export { CompleteOrderController }