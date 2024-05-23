import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  addDish,
  editDish,
  getMenuList,
  removeDish,
} from "../controllers/menu.controller.js";

const menuRouter = Router();

menuRouter.route("/add-dish").post(verifyUser, addDish);
menuRouter.route("/edit-dish/:dishId").post(verifyUser, editDish);
menuRouter.route("/remove-dish/:dishId").get(verifyUser, removeDish);
menuRouter.route("/get-menu").get(verifyUser, getMenuList);
export default menuRouter;
