import { Request, Response } from 'express'
import { DeleteCategoriesUseCase } from './DeleteCategoriesUseCase'



class DeleteCategoriesController{

    async handle(request:Request, response:Response){

        const { id } = request.query

        const deleteCategoryUseCase = new DeleteCategoriesUseCase()
        const categoryDelete = await deleteCategoryUseCase.execute(id)

        return response.status(200).json(categoryDelete)
    }
}

export { DeleteCategoriesController }