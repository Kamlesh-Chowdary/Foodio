import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Reservation } from "../models/reservation.model.js";
const addReservation = asyncHandler(async (req, res) => {
  const { customer_id, date, time, members, occation, reservationStatus } =
    req.body;

  if (
    [customer_id, date, time, members, occation].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(409, "All requried fields need to be filled.");
  }

  const reservation = await Reservation.create({
    customer_id,
    date,
    time,
    members,
    occation,
    reservationStatus,
  });

  const successful = await Reservation.findById(reservation._id).select("-__v");
  if (!successful) {
    throw new ApiError(404, "Error while saving the reservation details");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        successful,
        "Your Table has been reserved successfully."
      )
    );
});

const modifyReservation = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;
  if (!reservationId) {
    throw new ApiError(404, "Reservation Id is required");
  }
  const { date, time, members, occation } = req.body;

  if ([date, time, members, occation].some((field) => field?.trim === "")) {
    throw new ApiError(409, "All fields are required");
  }

  const reservation = await Reservation.findById(reservationId).select("-__v");

  if (!reservation) {
    throw new ApiError(404, "Invalid Reservation Id");
  }

  const updateReservation = await Reservation.findByIdAndUpdate(
    { _id: reservationId },
    {
      date,
      time,
      members,
      occation,
    },
    {
      new: true,
    }
  );

  if (!updateReservation) {
    throw new ApiError(404, "Error while updating the reservation details");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updateReservation, "Successfully Modified"));
});

const cancelReservation = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;

  if (!reservationId) throw new ApiError(404, "Reservation Id is required");

  const cancelReservation = await Reservation.findByIdAndUpdate(
    {
      _id: reservationId,
    },
    {
      reservationStatus: false,
    },
    { new: true }
  );
  if (!cancelReservation) {
    throw new ApiError(404, "Error while canceling the reservation");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        cancelReservation,
        "Reservation Canceled successfully."
      )
    );
});

const getReservation = asyncHandler(async (req, res) => {
  const { customer_id } = req.params;
  if (!customer_id) throw new ApiError(404, "Customer Id is required");

  const reservations = await Reservation.find({ customer_id });
  if (!reservations) {
    throw new ApiError(404, "No Tables are reserved by this customer.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        "All the reservations have been fetched  successfully"
      )
    );
});

export { addReservation, modifyReservation, cancelReservation, getReservation };
