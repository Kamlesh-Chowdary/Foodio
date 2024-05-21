import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customer_id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerdetails",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    occation: {
      type: String,
      required: true,
    },
    reservationStatus: Boolean,
  },
  {
    timestamps: true,
  }
);

export { reservationSchema };
