import mongoose from "mongoose";
import validator from "validator";
import brcypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

//middleware
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await brcypt.genSalt(10);
  this.password = await brcypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await brcypt.compare(userPassword, this.password);
  return isMatch;
};

//jsonwebtoken
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
