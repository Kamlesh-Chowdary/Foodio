import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customer_id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerdetails",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    members: {
      type: String,
      required: true,
    },
    occation: {
      type: String,
      required: true,
    },
    reservationStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reservation = mongoose.model("reservation", reservationSchema);
