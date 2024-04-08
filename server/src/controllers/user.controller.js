import { pool } from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }
  let query = "SELECT * FROM CUSTOMER WHERE email=?";
  await pool.query(query, [email], async (error, row) => {
    if (error) throw new ApiError(400, error.message);

    if (row.length > 0) {
      throw new ApiError(409, "User with this email already exists.");
    }

    let query =
      "INSERT INTO CUSTOMER (username,email, password) VALUES (?,? , ?)";
    const protectedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      query,
      [username, email, protectedPassword],
      (error, row) => {
        if (error) throw new ApiError(400, error.message);
        res
          .status(200)
          .json(new ApiResponse(201, "", "User registered Successfully"));
      }
    );
  });
});
export { registerUser };
