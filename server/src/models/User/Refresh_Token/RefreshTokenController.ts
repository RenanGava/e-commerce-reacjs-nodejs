import { Request, Response } from 'express'
import { RefreshTokenUseCase } from './RefreshTokenUseCase';


class RefreshTokenController {

    async handle(request: Request, response: Response) {
        const { refresh_token } = request.body

        const refreshTokenUseCase = new RefreshTokenUseCase()
        const token = await refreshTokenUseCase.exeucte(refresh_token)
 

        return response.status(200).json(token)
    }
}

export { RefreshTokenController }