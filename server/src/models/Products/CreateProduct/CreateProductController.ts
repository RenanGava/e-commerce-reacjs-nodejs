import { Request, Response } from 'express'
import { CreateProductsUseCase } from './CreateProductUseCase'


class CreateProductsController {

    async handle(request: Request, response: Response) {
        const {
            name,
            description,
            category_id,
            stock,
            price,
        } = request.body

        const createproductUseCase = new CreateProductsUseCase()

        const product = await createproductUseCase.execute({
            name,
            description,
            category_id,
            stock,
            price,
        })

        return response.status(200).json(product)
    }
}

export { CreateProductsController }