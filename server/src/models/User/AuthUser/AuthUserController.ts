import { Request, Response } from 'express'
import { AuthUserUseCase } from './AuthUserUseCase'


class AuthUserController {

    async handle(request: Request, response: Response) {
        const { email, password } = request.body

        const authUserUseCase = new AuthUserUseCase()

        const user = await authUserUseCase.execute({ email, password })

        return response.status(200).json(user)
    }
}

export { AuthUserController }