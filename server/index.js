import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from './db/db.js'
import authRoutes from './routes/authRoute.js'
import shopRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoute.js'

import cookieParser from "cookie-parser";
import path from "path";


dotenv.config()
connectDB()
const app = express()
app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true

}))
app.use(express.json())
app.use(cookieParser())

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// Apis
app.use('/api/users', authRoutes);


// http://localhost:3000/api/users/signup
// http://localhost:3000/api/users/login
// http://localhost:3000/api/users/logout
// http://localhost:3000/api/users/upload/profile/pic
// http://localhost:3000/api/users/updateProflie
// http://localhost:3000/api/users/getProfile

app.use('/api/admin', shopRoute)

// http://localhost:3000/api/admin/create_shop
// http://localhost:3000/api/admin/upload/logo
// http://localhost:3000/api/admin/upload/banner
// http://localhost:3000/api/admin/getShop
// http://localhost:3000/api/admin/upload/productImages
// http://localhost:3000/api/admin/addProduct

// http://localhost:3000/api/admin/getProductById/:productId
// http://localhost:3000/api/admin/getAllProduct
// http://localhost:3000/api/admin/deleteProduct/:id
// http://localhost:3000/api/admin/editProduct/:productId

app.use('/api/allUsers', userRoute)

// http://localhost:3000/api/allUsers/getAllPorduct?skip=0&limit=10
// http://localhost:3000/api/allUsers/getAllCategories
// http://localhost:3000/api/allUsers/getAllStores
// http://localhost:3000/api/allUsers/getStoreBySlug/:slug
// http://localhost:3000/api/allUsers/getStoreBySlug/:slug/product
// http://localhost:3000/api/allUsers/addToCart/:uId
// http://localhost:3000/api/allUsers/getCartProduct
// http://localhost:3000/api/allUsers/cart/quantity
// http://localhost:3000/api/allUsers/cart/delete/:productId
// http://localhost:3000/api/allUsers/getProductById/:pid
// http://localhost:3000/api/allUsers/rateProduct/:slug/:pId
// http://localhost:3000/api/allUsers/getratedProduct/:pId
// http://localhost:3000/api/allUsers/getSearchProduct?searchQuery=awais
// http://localhost:3000/api/allUsers/orderProduct




const PORT = process.env.PORT || 5000




app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})



