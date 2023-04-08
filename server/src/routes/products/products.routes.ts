import { Router } from 'express'
import { CreateProductsController } from '../../models/Products/CreateProduct/CreateProductController'



const productsRouter = Router()

productsRouter.post("/create", new CreateProductsController().handle)
productsRouter.get("/list", )



export { productsRouter }