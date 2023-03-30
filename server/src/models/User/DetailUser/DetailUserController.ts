import { Request, Response } from "express";
import { DetailUserUseCase } from "./DetailUserUseCase";


class DetailUserController {

    async hanlde(request: Request, response: Response) {
        const { userId } = request.body

        const detailUserUseCase = new DetailUserUseCase()
        const user = await detailUserUseCase.execute(userId)
        
        return response.status(200).json(user)
    }
}

export {DetailUserController}