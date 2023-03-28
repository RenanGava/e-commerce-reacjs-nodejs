import { Router } from 'express'
import { upload } from '../../middlewares/CloudnaryProvider'
import { CreateUserController } from '../../models/User/CreateUserController'


const userRouter = Router()

userRouter.post("/login", upload.single("file") ,new CreateUserController().handle)


export { userRouter }