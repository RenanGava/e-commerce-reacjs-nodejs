import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUsecase";



class CreateUserController {

    async handle(request: Request, response: Response) {
        // const { name, email, password } = request.body
        // const { path: avatar } = request.file
        const { 
            body: { name, email, password },
            file: { path: avatar }
        } = request

        const createUserUseCase = new CreateUserUseCase()

        const user = await createUserUseCase.execute({ name, email, password, avatar })

        return response.status(201).json(user)
    }

}

export { CreateUserController }