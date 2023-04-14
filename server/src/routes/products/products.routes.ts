import { Router } from 'express'
import { CreateProductsController } from '../../models/Products/CreateProduct/CreateProductController'
import { isAuthenticated } from '../../middlewares/IsAuthenticated'
import { ListProductsController } from '../../models/Products/ListProducts/ListProductsController'
import { UpdateProductController } from '../../models/Products/UpdateProducts/UpdateProductsController'


const productsRouter = Router()

productsRouter.get("/list", new ListProductsController().handle)
productsRouter.post("/create", isAuthenticated, new CreateProductsController().handle)
productsRouter.put("/update", new UpdateProductController().handle)
productsRouter.delete("/delete", isAuthenticated)




export { productsRouter }