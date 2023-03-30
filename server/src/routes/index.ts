import { Request, Response, Router } from 'express'
import { isAuthenticated } from '../middlewares/IsAuthenticated'
import { userRouter } from './user/user.routes'

const router = Router()

router.use("/user", userRouter)
// router.use("/products")
// router.use("/categories")


// router.post('/', isAuthenticated, async (request: Request, response: Response) => {

//     const { userId } =  request.headers

//     console.log(userId);
    
//     const data = {
//         avatar: '',
//         email: 'olámundo',
//         name:'Renan',
//         stripe_customer_id:""
//     }



//     return response.json({data, userId})
// })



export { router }