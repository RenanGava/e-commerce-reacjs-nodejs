import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";





class CreateCategoryController {

    async handle(request: Request, response: Response) {

        const { categoryName } = request.body

        const createCategoryUseCase = new CreateCategoryUseCase()

        const category = await createCategoryUseCase.execute({
            name: categoryName
        })

        return response.status(201).json(category)
    }
}

export { CreateCategoryController }