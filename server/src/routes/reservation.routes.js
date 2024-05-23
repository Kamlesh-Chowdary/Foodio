import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  addReservation,
  cancelReservation,
  modifyReservation,
} from "../controllers/reservation.controller.js";

const reservationRouter = Router();

reservationRouter.route("/create-reservation").post(verifyUser, addReservation);
reservationRouter
  .route("/edit-reservation/:reservationId")
  .patch(verifyUser, modifyReservation);
reservationRouter
  .route("/cancel-reservation/:reservationId")
  .get(verifyUser, cancelReservation);

export default reservationRouter;
