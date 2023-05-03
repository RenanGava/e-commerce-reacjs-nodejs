import { Request, Response } from "express";
import { AddProductOrderUseCase } from "./AddProductOrderUseCase";


class AddProductOrderController {

    async handle(request: Request, response: Response) {
        const { userId, product_id } = request.body

        
        const addProductOrderUseCase = new AddProductOrderUseCase()
        
        const order = await addProductOrderUseCase.execute({product_id, userId})

        return response.status(200).json(order)
    }
}

export { AddProductOrderController }