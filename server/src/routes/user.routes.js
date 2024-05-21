import Router from "express";
import {
  loginCustomer,
  logoutCustomer,
  registerCustomer,
} from "../controllers/user.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";
import { customerDetails } from "../controllers/customer_detail.controller.js";
const userRouter = Router();

userRouter.route("/register").post(registerCustomer);
userRouter.route("/login").post(loginCustomer);
userRouter.route("/logout").get(verifyUser, logoutCustomer);
userRouter.route("/details").post(verifyUser, customerDetails);
export { userRouter };
