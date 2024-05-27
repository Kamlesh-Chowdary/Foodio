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
    "-password -__v"
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

const loginCustomer = asyncHandler(async (req, res) => {
  //get the email and password
  //verify if its not empty
  //validate email and password
  //generate token
  //return token in response

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const customer = await Customer.findOne({ email });

  if (!customer) {
    throw new ApiError(404, "Customer with this email doesn't exist");
  }
  const isPasswordCorrect = await customer.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const token = await customer.generateToken();

  const loggedInCustomer = await Customer.findByIdAndUpdate(customer._id, {
    token,
  }).select("-password -token -__v");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: true,
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        201,
        { customer: loggedInCustomer, token },
        "Customer logged in successfully"
      )
    );
});

const logoutCustomer = asyncHandler(async (req, res) => {
  await Customer.findByIdAndUpdate(
    req.customer._id,
    {
      $unset: { token: 1 },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(201, {}, "Customer logged out successfully"));
});

const getCustomerDetails = asyncHandler(async (req, res) => {
  const customerDetails = await Customer.aggregate([
    {
      $match: {
        _id: req.customer?._id,
      },
    },
    {
      $lookup: {
        from: "customerdetails",
        localField: "_id",
        foreignField: "customer_id",
        as: "customer_details",
        pipeline: [
          {
            $project: {
              message: 0,
              __v: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        password: 0,
        token: 0,
        __v: 0,
      },
    },
  ]);
  console.log(customerDetails);
  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        customerDetails,
        "Customer Details fetched successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        req.customer,
        "Current user details fetched successfully"
      )
    );
});

export {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  getCustomerDetails,
  getCurrentUser,
};
