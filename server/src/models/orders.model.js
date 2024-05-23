import mongoose from "mongoose";
import { Menu } from "./menu.model.js";
const orderItemSchema = new mongoose.Schema({
  dishId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Menu",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  message: {
    type: String,
    trim: true,
  },
  totalPrice: {
    required: true,
    type: Number,
    default: 0,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Cash On Delivery", "Credit Card", "Bank Transfer", "UPI"],
    default: "Cash On Delivery",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customerdetails",
  },
});

orderSchema.pre("save", async function (next) {
  const order = this;
  const dishIds = order.items.map((dish) => dish.dishId);
  const dishes = await Menu.find({
    _id: {
      $in: dishIds,
    },
  });

  order.totalPrice = order.items.reduce((total, item) => {
    const dish = dishes.find((d) => d._id === item.dishId);
    if (dish) {
      total += dish.price * item.quantity;
    }
    return total;
  }, 0);
});

export const Order = mongoose.model("Order", orderSchema);
