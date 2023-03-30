import { Router } from 'express'
import { upload } from '../../middlewares/CloudnaryProvider'
import { isAuthenticated } from '../../middlewares/IsAuthenticated'
import { AuthUserController } from '../../models/User/AuthUser/AuthUserController'
import { CreateUserController } from '../../models/User/CreateUser/CreateUserController'
import { DetailUserController } from '../../models/User/DetailUser/DetailUserController'
import { RefreshTokenController } from '../../models/User/Refresh_Token/RefreshTokenController'


const userRouter = Router()
// Create User
userRouter.post("/register", upload.single("file"), new CreateUserController().handle)
userRouter.post("/login", new AuthUserController().handle)
userRouter.post("/refresh_token", new RefreshTokenController().handle)
userRouter.get("/detail", isAuthenticated, new DetailUserController().hanlde)



export { userRouter }