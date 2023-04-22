import { Request, Response } from "express";
import { DeleteProductsUseCase } from "./DeleteProductsUseCase";





class DeleteProductController {

    async handle(request:Request, response:Response){
        const { id } = request.query

        const deleteProductsUseCase = new DeleteProductsUseCase()
        const productDelete = await deleteProductsUseCase.execute(id)

        return response.status(200).json(productDelete)
    }
}

export { DeleteProductController }