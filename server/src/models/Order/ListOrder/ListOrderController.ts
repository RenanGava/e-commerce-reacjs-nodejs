import { Request, Response } from "express";
import { ListOrderUseCase } from "./ListOrderUseCase";


class ListOrderController{

    async handle(request:Request, response:Response){

        const listOrderUseCase = new ListOrderUseCase()
        const orders = await listOrderUseCase.execute()

        return response.status(200).json(orders)
    }
}

export { ListOrderController }