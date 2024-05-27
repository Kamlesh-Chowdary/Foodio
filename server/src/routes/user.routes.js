import Router from "express";
import {
  getCurrentUser,
  getCustomerDetails,
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
userRouter.route("/get-details").get(verifyUser, getCustomerDetails);
userRouter.route("/current-user").get(verifyUser, getCurrentUser);
export default userRouter;
