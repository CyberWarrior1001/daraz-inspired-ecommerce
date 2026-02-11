import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  signupUser,
  UpdateProfile,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import { upload } from "../config/upload.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", protect, logoutUser);
router.post("/upload/profile/pic", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    success: true,
    filename: req.file.filename,
    path: req.file.path,
  });
});
router.put("/updateProflie", protect, UpdateProfile)
router.get("/getProfile", protect, getProfile)


export default router;
