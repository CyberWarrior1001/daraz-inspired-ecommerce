import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/authSchema.js";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    console.log({ name, email, password, confirmpassword });

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All field are required!",
      });
    }
    // check user exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exist!",
      });
    }
    if (password != confirmpassword) {
      return res.status(401).json({
        success: false,
        message: "Password doesnot matched!",
      });
    }

    // Hash password!
    const salat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salat);

    // create user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // create token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true, // JS cannot access
      secure: false, // true in production (https)
      sameSite: "lax", // prevents CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// For user login:
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    // Validation
    if ((!email, !password)) {
      return res.status(400).json({
        success: false,
        message: "All field are required!",
      });
    }

    // check user

    const user = await User.findOne({ email });
    console.log(user.name);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // create token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true, // JS cannot access
      secure: false, // true in production (https)
      sameSite: "lax", // prevents CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      username: user.name,
      uid: user._id,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout user

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update profile


export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)

    // pick only allowed fields
    const { name, email, phonenumber, address, profilePic, gender, role } =
      req.body;

    // build update object dynamically
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phonenumber) updateData.phonenumber = phonenumber;
    if (address) updateData.address = address;
    if (profilePic) updateData.profilePic = profilePic;
    if (gender) updateData.gender = gender;
    if (role) updateData.role = role;

    // if nothing to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided to update",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};



export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)

    const user = await User.findById(userId)
      .select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};
