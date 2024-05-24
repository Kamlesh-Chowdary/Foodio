import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getOrders,
  getSingleOrder,
} from "../controllers/orderItem.controller.js";

const orderRouter = Router();

orderRouter.route("/create-order").post(verifyUser, createOrder);
orderRouter.route("/all-orders").get(verifyUser, getOrders);
orderRouter.route("/single-order/:orderId").get(verifyUser, getSingleOrder);
export default orderRouter;
