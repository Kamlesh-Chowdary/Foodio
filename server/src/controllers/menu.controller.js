import { Menu } from "../models/menu.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

const editDish = asyncHandler(async (req, res) => {
  const { dishId } = req.params;
  if (!dishId) {
    throw new ApiError(404, "Dish Id is required");
  }
  const { name, category, description, price, rating } = req.body;

  if (isNaN(price)) throw new ApiError(409, "Price is required");

  if (
    [name, category, description, rating].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(409, "All the fields are required");
  }

  const dish = await Menu.findById(dishId).select("-__v");

  if (!dish) {
    throw new ApiError(404, "Invalid Dish Id");
  }

  const updateDish = await Menu.findByIdAndUpdate(
    { _id: dishId },
    {
      name,
      category,
      description,
      price,
      rating,
    },
    {
      new: true,
    }
  );

  if (!updateDish) {
    throw new ApiError(404, "Error while updating the dish details");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updateDish, "Successfully Modified"));
});

const removeDish = asyncHandler(async (req, res) => {
  const { dishId } = req.params;

  if (!dishId) throw new ApiError(404, "Dish Id is required");

  const removeDishItem = await Menu.findByIdAndDelete({ _id: dishId });
  if (!removeDishItem) {
    throw new ApiError(404, "Error while Removing the Dish ");
  }

  res
    .status(200)
    .json(new ApiResponse(200, removeDishItem, "Dish removed successfully."));
});

const getMenuList = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category && category !== "All Category" ? { category } : {};
  const menuList = await Menu.find(filter).select("-__v");
  if (!menuList) throw new ApiError(404, "Error while fetching whole menu");

  res
    .status(200)
    .json(new ApiResponse(200, menuList, "Menu fetched successfully"));
});

const getSingleDish = asyncHandler(async (req, res) => {
  const { dishId } = req.params;
  if (!dishId) throw new ApiError(404, "Dish Id is required");

  const singleDish = await Menu.findById(dishId).select("-__v");

  if (!singleDish)
    throw new ApiError(404, "Error while fetching the dish item");

  res
    .status(200)
    .json(
      new ApiResponse(200, singleDish, "Dish details fetched successfully")
    );
});

export { addDish, editDish, removeDish, getMenuList, getSingleDish };
