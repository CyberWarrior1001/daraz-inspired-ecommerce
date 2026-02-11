import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      minlength: 11,
      maxlength: 15,
    },

    address: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
    },
    profilePic: {
        type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
