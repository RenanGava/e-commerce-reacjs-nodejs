import { Router } from "express";
import { AddProductOrderController } from "../../models/Order/AddProductOrder/AddProductOrderController";
import { isAuthenticated } from "../../middlewares/IsAuthenticated";

const orderRouter = Router()

orderRouter.put("/add/product", isAuthenticated, new AddProductOrderController().handle)


export { orderRouter }




