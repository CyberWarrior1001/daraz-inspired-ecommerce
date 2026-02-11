import express from 'express'
import { addProduct, createShop, deleteProdect, editProduct, getAllProducts, getProductById, getShope } from '../controllers/adminController.js'
import protect from '../middleware/authMiddleware.js'
import { upload } from '../config/upload.js'

const router = express.Router()

router.post("/create_shop", protect, createShop)

router.post("/upload/logo", upload.single("logo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({
    success: true,
    filename: req.file.filename,
    path: req.file.path,
  });
});

router.post("/upload/banner", upload.single("banner"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    success: true,
    filename: req.file.filename,
    path: req.file.path,
  });
});

router.post(
  "/upload/productImages",
  upload.array("productImages", 10), // max 10 images
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const images = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    res.status(200).json({
      success: true,
      images,
    });
  }
);

router.get("/getShop", protect, getShope)
router.put("/addProduct", protect, addProduct)
router.get("/getProductById/:productId", protect, getProductById)
router.get("/getAllProduct", protect, getAllProducts)  
router.delete("/deleteProduct/:id", protect, deleteProdect)
router.post("/editProduct/:productId", protect, editProduct)



export default router