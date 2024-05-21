import { CustomerDetail } from "../models/customer_detail.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const customerDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, phonenumber, message } = req.body;
  if (isNaN(phonenumber)) {
    throw new ApiError(409, "Enter a valid phonenumber");
  }
  if ([firstName, lastName, address].some((field) => field?.trim() === "")) {
    throw new ApiError(409, "Enter all the required information");
  }

  const availableCustomerDetails = await CustomerDetail.findOne({
    phonenumber,
  });

  if (availableCustomerDetails) {
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          availableCustomerDetails,
          "Customer Details are already available."
        )
      );
  } else {
    const customerDetails = await CustomerDetail.create({
      firstName,
      lastName,
      address,
      phonenumber,
      message,
      customer_id: req.customer._id,
    });

    const registeredCustomerDetails = await CustomerDetail.findById(
      customerDetails._id
    ).select("-__v");

    if (!registeredCustomerDetails) {
      throw new ApiError(404, "Error while registering the customer details");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          201,
          registeredCustomerDetails,
          "Customer Details registered Successfully"
        )
      );
  }
});

export { customerDetails };
