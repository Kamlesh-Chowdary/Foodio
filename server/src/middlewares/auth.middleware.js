import { Customer } from "../models/customer.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const customer = await Customer.findById(decodedToken?._id).select(
      "-password -token"
    );

    if (!customer) {
      throw new ApiError(401, "Invalid Token");
    }

    req.customer = customer;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid token");
  }
});

export default verifyUser;
