import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/orderItem.controller.js";

const orderRouter = Router();

orderRouter.route("/create-order").post(verifyUser, createOrder);

export default orderRouter;
