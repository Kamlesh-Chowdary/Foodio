import mongoose from "mongoose";

const customerDetailSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CustomerDetail = mongoose.model(
  "CustomerDetail",
  customerDetailSchema
);
