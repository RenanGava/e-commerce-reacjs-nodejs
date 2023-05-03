import { Router } from 'express'
import { CreateCategoryController } from '../../models/Categories/CreateCategories/CreateCategoryController'
import { ListCategoriesController } from '../../models/Categories/ListCategories/ListCategoriesController'
import { DeleteCategoriesController } from '../../models/Categories/DeleteCategories/DeleteCategoriesController'
import { isAuthenticated } from '../../middlewares/IsAuthenticated'



const categoryRouter = Router()

categoryRouter.post("/create", isAuthenticated, new CreateCategoryController().handle)
categoryRouter.get("/list", new ListCategoriesController().hanlde)
categoryRouter.delete("/delete/:id", isAuthenticated, new DeleteCategoriesController().handle)



export { categoryRouter }