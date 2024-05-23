import Router from "express";
import verifyUser from "../middlewares/auth.middleware";
import { addDish } from "../controllers/menu.controller";

const menuRouter = Router();

menuRouter.route("/add-dish").post(verifyUser, addDish);

export default menuRouter;
