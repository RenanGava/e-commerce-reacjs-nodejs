import { Router } from 'express'
import { CreateProductsController } from '../../models/Products/CreateProduct/CreateProductController'
import { isAuthenticated } from '../../middlewares/IsAuthenticated'
import { ListProductsController } from '../../models/Products/ListProducts/ListProductsController'



const productsRouter = Router()

productsRouter.post("/create", isAuthenticated, new CreateProductsController().handle)
productsRouter.get("/list", new ListProductsController().handle)



export { productsRouter }