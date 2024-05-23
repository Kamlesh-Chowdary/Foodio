import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { addReservation } from "../controllers/reservation.controller.js";

const reservationRouter = Router();

reservationRouter.route("/create-reservation").post(verifyUser, addReservation);

export default reservationRouter;
