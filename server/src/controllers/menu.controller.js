import { Menu } from "../models/menu.model";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const addDish = asyncHandler(async (req, res) => {
  const { name, category, description, price, rating } = req.body;

  if (isNaN(price)) throw new ApiError(409, "Price is required");

  if (
    [name, category, description, rating].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(409, "All the fields are required");
  }

  const dish = await Menu.create({
    name,
    category,
    description,
    price,
    rating,
  });

  const uploadedDish = await Menu.findById(dish._id).select("-__v");
  if (!uploadedDish)
    throw new ApiError(404, "Error while uploading the item details");

  res
    .status(200)
    .json(
      new ApiResponse(200, uploadedDish, "Item details uploaded successfully")
    );
});

export { addDish };
