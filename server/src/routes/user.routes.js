import Router from "express";
import {
  loginCustomer,
  registerCustomer,
} from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.route("/register").post(registerCustomer);
userRouter.route("/login").post(loginCustomer);
export { userRouter };
