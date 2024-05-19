import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const customerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            value
          );
        },
        message: () => {
          return "Password must contain atleast 8 characters, including UPPER/lowercase and numbers";
        },
      },
    },

    customer_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer_Detail",
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

customerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

customerSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRY,
    }
  );
};

export const Customer = mongoose.model("Customer", customerSchema);
