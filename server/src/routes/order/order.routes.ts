import { Router } from "express";
import { AddProductOrderController } from "../../models/Order/AddProductOrder/AddProductOrderController";
import { isAuthenticated } from "../../middlewares/IsAuthenticated";
import { CompleteOrderController } from "../../models/Order/CompletedOrder/CompleteOrderController";
import { ListOrderController } from "../../models/Order/ListOrder/ListOrderController";

const orderRouter = Router()

orderRouter.put("/add/product", isAuthenticated, new AddProductOrderController().handle)
orderRouter.put("/complete/order", isAuthenticated, new CompleteOrderController().handle)
orderRouter.get("/list", isAuthenticated, new ListOrderController().handle)

export { orderRouter }




