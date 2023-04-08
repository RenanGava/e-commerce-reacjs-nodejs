import { Request, Response, request } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {


    async hanlde(request: Request, response: Response) {

        const listCategoriesUseCase = new ListCategoriesUseCase()
        const catgories = await listCategoriesUseCase.execute()

        return response.status(200).json(catgories)
    }
}

export { ListCategoriesController }