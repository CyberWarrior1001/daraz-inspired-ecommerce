import express from 'express'
import { AddToCart, getAddToCart, getAllCategories, getAllProducts, getAllStores, getParticularStoreProductBySlug, getProductById, getRatedProduct, getSearchProduct, getStoreBySlug, orderProduct, ratingProduct, removeFromCart, updateCartQuantity } from '../controllers/userController.js'
import protect from "../middleware/authMiddleware.js";



const router = express.Router()

router.get("/getAllPorduct", getAllProducts)
router.get("/getAllCategories", getAllCategories)
router.get("/getAllStores", getAllStores)
router.get("/getStoreBySlug/:slug", getStoreBySlug)
router.get("/getStoreBySlug/:slug/product", getParticularStoreProductBySlug)
router.get("/getProductById/:pId", getProductById)
router.put("/addToCart/:pId", protect, AddToCart)
router.get("/getCartProduct", protect, getAddToCart)
router.patch("/cart/quantity", protect, updateCartQuantity)
router.delete("/cart/delete/:productId", protect, removeFromCart)
router.post("/rateProduct/:slug/:pId", protect, ratingProduct)
router.get("/getratedProduct/:pId", protect, getRatedProduct)
router.get("/getSearchProduct", getSearchProduct)
router.post("/orderProduct", protect, orderProduct)



export default router