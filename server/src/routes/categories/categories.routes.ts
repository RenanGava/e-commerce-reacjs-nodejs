import { Router } from 'express'
import { CreateCategoryController } from '../../models/Categories/CreateCategories/CreateCategoryController'
import { ListCategoriesController } from '../../models/Categories/ListCategories/ListCategoriesController'
import { DeleteCategoriesController } from '../../models/Categories/DeleteCategories/DeleteCategoriesController'



const categoryRouter = Router()

categoryRouter.post("/create", new CreateCategoryController().handle)
categoryRouter.get("/list", new ListCategoriesController().hanlde)
categoryRouter.delete("/delete/:id", new DeleteCategoriesController().handle)



export { categoryRouter }