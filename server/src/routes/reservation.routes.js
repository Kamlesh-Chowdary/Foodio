import Router from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  addReservation,
  cancelReservation,
  getReservation,
  getsingleReservation,
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
reservationRouter.route("/all-reservations").get(verifyUser, getReservation);
reservationRouter
  .route("/single-reservation/:reservation_id")
  .get(verifyUser, getsingleReservation);
export default reservationRouter;
