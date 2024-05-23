import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  addDish,
  editDish,
  removeDish,
} from "../controllers/menu.controller.js";

const menuRouter = Router();

menuRouter.route("/add-dish").post(verifyUser, addDish);
menuRouter.route("/edit-dish/:dishId").post(verifyUser, editDish);
menuRouter.route("/remove-dish/:dishId").get(verifyUser, removeDish);
export default menuRouter;
