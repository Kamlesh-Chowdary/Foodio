import Router from "express";
import {
  loginCustomer,
  logoutCustomer,
  registerCustomer,
} from "../controllers/user.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.route("/register").post(registerCustomer);
userRouter.route("/login").post(loginCustomer);
userRouter.route("/logout").get(verifyUser, logoutCustomer);
export { userRouter };
