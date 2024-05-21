import mongoose from "mongoose";

const customerDetailSchema = new mongoose.Schema({
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
});

export const CustomerDetail = mongoose.model(
  "CustomerDetail",
  customerDetailSchema
);
