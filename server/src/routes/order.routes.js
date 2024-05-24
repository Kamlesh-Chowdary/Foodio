import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  createOrder,
  editOrder,
  getOrders,
  getSingleOrder,
} from "../controllers/orderItem.controller.js";

const orderRouter = Router();

orderRouter.route("/create-order").post(verifyUser, createOrder);
orderRouter.route("/all-orders").get(verifyUser, getOrders);
orderRouter.route("/single-order/:orderId").get(verifyUser, getSingleOrder);
orderRouter.route("/edit-order/:orderId").patch(verifyUser, editOrder);
export default orderRouter;
