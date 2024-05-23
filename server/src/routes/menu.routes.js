import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { addDish, editDish } from "../controllers/menu.controller.js";

const menuRouter = Router();

menuRouter.route("/add-dish").post(verifyUser, addDish);
menuRouter.route("/edit-dish/:dishId").post(verifyUser, editDish);
export default menuRouter;
