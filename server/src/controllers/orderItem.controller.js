import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/orders.model.js";

const createOrder = asyncHandler(async (req, res) => {
  const { items, message, paymentMethod, customerId } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(409, "All fields are required");
  }

  if (items.some((item) => item.quantity === 0)) {
    throw new ApiError(409, "Quantity for each item must be greater than 0");
  }

  if ([paymentMethod, customerId].some((field) => field?.trim() === "")) {
    throw new ApiError(409, "All fields are required");
  }

  const order = await Order.create({
    items,
    message,
    paymentMethod,
    customerId,
  });
  const placedOrder = await Order.findById(order._id).select("-__v ");

  if (!placedOrder) throw new ApiError(404, "Error while placing the order");

  res
    .status(200)
    .json(new ApiResponse(200, placedOrder, "Order Placed Successfully"));
});

export { createOrder };
