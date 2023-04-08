import { Request, Response } from "express";
import { ListProductsUseCase } from "./ListProductsUseCase";




class ListProductsController{


    async handle(rquest: Request, response: Response){
        const listProductsUseCase = new ListProductsUseCase()

        const products = await listProductsUseCase.execute()

        return response.status(200).json(products)
    }
}

export { ListProductsController }