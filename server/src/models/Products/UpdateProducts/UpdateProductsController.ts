import { Request, Response } from 'express'
import { UpdateProductUseCase } from './UpdateProductsUseCase'


class UpdateProductController {

    async handle(request: Request, response: Response) {
        const { id, name, description, amount, stock, price, category } = request.body

        const updateProductController = new UpdateProductUseCase()

        const product = await updateProductController.execute({
            id,
            name,
            description,
            amount,
            stock,
            price,
            category 
        })

        return response.status(200).json(product)
    }
}

export { UpdateProductController }