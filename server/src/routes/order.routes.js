import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { createOrder, getOrders } from "../controllers/orderItem.controller.js";

const orderRouter = Router();

orderRouter.route("/create-order").post(verifyUser, createOrder);
orderRouter.route("/all-orders").get(verifyUser, getOrders);
export default orderRouter;
