import Router from "express";
import { registerCustomer } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.route("/register").post(registerCustomer);

export { userRouter };
