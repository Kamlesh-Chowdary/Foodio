import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Customer } from "../models/customer.model.js";

const registerCustomer = asyncHandler(async (req, res) => {
  //get the data from frontend.
  //check that all the values are valid - not empty
  //check if user already exists - email
  //create user object-create database entry
  //remove password and refreshtoken in the response
  //check for user creation
  //return response to the frontend

  const { fullname, email, password } = req.body;
  if ([fullname, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) {
    throw new ApiError(409, "User with this email already exists");
  }

  const customer = await Customer.create({
    fullname,
    email,
    password,
  });

  const createdCustomer = await Customer.findById(customer._id).select(
    "-password -customer_details"
  );

  if (!createdCustomer) {
    throw new ApiError(404, "Error while registering the customer");
  }

  res
    .status(200)
    .json(
      new ApiResponse(201, createdCustomer, "Customer Registered Successfully")
    );
});

export { registerCustomer };
