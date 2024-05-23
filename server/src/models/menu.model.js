import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  rating: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Menu = mongoose.model("Menu", MenuSchema);
