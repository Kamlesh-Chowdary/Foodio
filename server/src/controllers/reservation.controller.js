import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Reservation } from "../models/reservation.model.js";
import { CustomerDetail } from "../models/customer_detail.model.js";
import mongoose from "mongoose";
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
  const userId = req.customer._id;
  if (!userId) throw new ApiError(404, " Unauthorized Request");

  const customerDetails = await CustomerDetail.find({
    customer_id: userId,
  }).select("-__v");

  const customerDetailsIds = customerDetails.map((details) => details._id);

  const reservations = await Reservation.aggregate([
    {
      $match: {
        customer_id: {
          $in: customerDetailsIds,
        },
      },
    },
    {
      $lookup: {
        from: "customerdetails",
        localField: "customer_id",
        foreignField: "_id",
        as: "customerDetails",
        pipeline: [
          {
            $project: {
              __v: 0,
              createdAt: 0,
              updatedAt: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        customer_id: 0,
      },
    },
  ]);
  if (!reservations) {
    throw new ApiError(404, "Error while fetching the reservations");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        reservations,
        "All reservations fetched successfully"
      )
    );
});

const getsingleReservation = asyncHandler(async (req, res) => {
  const { reservation_id } = req.params;

  if (!reservation_id) throw new ApiError(404, "Reservation id is required");

  const userId = req.customer._id;
  if (!userId) throw new ApiError(404, " Unauthorized Request");

  const customerDetails = await CustomerDetail.find({
    customer_id: userId,
  }).select("-__v");

  const customerDetailsIds = customerDetails.map((details) => details._id);

  const singleReservation = await Reservation.aggregate([
    {
      $match: {
        customer_id: {
          $in: customerDetailsIds,
        },
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(reservation_id),
      },
    },
    {
      $lookup: {
        from: "customerdetails",
        localField: "customer_id",
        foreignField: "_id",
        as: "customerDetails",
        pipeline: [
          {
            $project: {
              __v: 0,
              createdAt: 0,
              updatedAt: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        customer_id: 0,
      },
    },
  ]);

  if (!singleReservation) throw new ApiError(404, "Invalid reservation id");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        singleReservation,
        "Single reservation fetched successfully."
      )
    );
});

export {
  addReservation,
  modifyReservation,
  cancelReservation,
  getReservation,
  getsingleReservation,
};
