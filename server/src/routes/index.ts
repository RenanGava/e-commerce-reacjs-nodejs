import { Router } from 'express'
import { userRouter } from './user/user.routes'

const router = Router()

router.use("/user", userRouter)
// router.use("/products")
// router.use("/categories")


// router.post('/', upload.array("files"), async (request: Request, response: Response) => {

//     const { files } = request
//     const { name } = request.body

//     const data = await prisma.user.create({
//         data:{
//         avatar: '',
//         email: 'olámundo',
//         name:'Renan',
//         stripe_customer_id:""
//     }})

    

//     return response.json({ files, name, data })
// })



export { router }