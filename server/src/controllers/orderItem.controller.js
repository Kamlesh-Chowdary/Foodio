import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/orders.model.js";
import { CustomerDetail } from "../models/customer_detail.model.js";
import mongoose from "mongoose";
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
const editOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { items, message, paymentMethod } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(409, "All fields are required");
  }

  if (items.some((item) => item.quantity === 0)) {
    throw new ApiError(409, "Quantity for each item must be greater than 0");
  }

  if (paymentMethod.trim() === "") {
    throw new ApiError(409, "All fields are required");
  }

  const updateOrder = await Order.findByIdAndUpdate(
    { _id: orderId },
    {
      items,
      message,
      paymentMethod,
    },
    {
      new: true,
    }
  ).select("-__v ");

  if (!updateOrder) throw new ApiError(404, "Error while updating the order");

  res
    .status(200)
    .json(new ApiResponse(200, updateOrder, "Order updated Successfully"));
});

const getOrders = asyncHandler(async (req, res) => {
  const userId = req.customer._id;
  if (!userId) throw new ApiError(404, " Unauthorized Request");

  const customerDetails = await CustomerDetail.find({
    customer_id: userId,
  }).select("-__v");

  const customerDetailsIds = customerDetails.map((details) => details._id);

  const orders = await Order.aggregate([
    {
      $match: {
        customerId: {
          $in: customerDetailsIds,
        },
      },
    },
    {
      $lookup: {
        from: "customerdetails",
        localField: "customerId",
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
      $lookup: {
        from: "menus",
        localField: "items.dishId",
        foreignField: "_id",
        as: "itemDetails",
        pipeline: [
          {
            $project: {
              name: 1,
              _id: 1,
              price: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        customerId: 0,
        __v: 0,
      },
    },
  ]);

  if (!orders) {
    throw new ApiError(404, "Error while fetching the orders");
  }

  res.status(200).json(200, orders, "All orders fetched successfully");
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) throw new ApiError(409, "Order id is required");
  const userId = req.customer._id;
  if (!userId) throw new ApiError(404, " Unauthorized Request");

  const customerDetails = await CustomerDetail.find({
    customer_id: userId,
  }).select("-__v");

  const customerDetailsIds = customerDetails.map((details) => details._id);

  const singleOrder = await Order.aggregate([
    {
      $match: {
        customerId: {
          $in: customerDetailsIds,
        },
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(orderId),
      },
    },
    {
      $lookup: {
        from: "customerdetails",
        localField: "customerId",
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
      $lookup: {
        from: "menus",
        localField: "items.dishId",
        foreignField: "_id",
        as: "itemDetails",
        pipeline: [
          {
            $project: {
              name: 1,
              _id: 1,
              price: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        customerId: 0,
        __v: 0,
      },
    },
  ]);

  if (!singleOrder) {
    throw new ApiError(404, "Error while fetching the order");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, singleOrder, "Order details fetched successfully")
    );
});

export { createOrder, getOrders, getSingleOrder, editOrder };
