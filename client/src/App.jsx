import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./AdminLayout";
import AdminHome from "./pages/AdminPages/AdminHome";
import CreateShop from "./pages/AdminPages/CreateShop";
import Dashboard from "./pages/AdminPages/Dashboard";
import AddProduct from "./pages/AdminPages/AddProduct";
import AdminProducts from "./pages/AdminPages/AdminProducts";
import ViewOrders from "./pages/AdminPages/ViewOrders";
import OrderDetails from "./pages/AdminPages/OrderDetails";
import EditProduct from "./pages/AdminPages/EditProduct";
import AllStores from "./pages/AllStores";
import StoreDetail from "./pages/StoreDetail";
import StoreProducts from "./pages/StoreProducts";
import AddToCart from "./pages/AddToCart";
import ProductDetailPage from "./pages/ProductDetailPage";
import AllProducts from "./pages/AllProducts";
import DummyGatewayForm from "./pages/BuyNow";
import ProceedToCheckout from "./pages/ProceedToCheckout";


function App() {
  return (
    <Router>
      <Routes>

        {/* 🌐 Main Layout */}
        <Route element={<Layout />}>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/proceedToCheckOut" element={<ProceedToCheckout />} />
          <Route path="/profile/:uid" element={<ProfilePage />} />
          <Route path="/allStores" element={<AllStores />} />
          <Route path="/addToCart" element={<AddToCart />} />
          <Route path="/allStores/:slug" element={<StoreDetail />} />
          <Route path="/allStores/:slug/products" element={<StoreProducts />} />
          <Route path="/allStores/:slug/products/:productId" element={<ProductDetailPage/>} />

          {/* 🔐 Admin routes INSIDE main layout */}
          <Route path="/admin/:uid" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="creat_shop" element={<CreateShop />} />
            <Route path="/admin/:uid/:slug/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/:uid/:slug/dashboard/addproduct" element={<AddProduct/>}/>
            <Route path="/admin/:uid/:slug/dashboard/product" element={<AdminProducts/>}/>
            <Route path="/admin/:uid/:slug/dashboard/orders" element={<ViewOrders/>}/>
            <Route path="/admin/:uid/:slug/dashboard/orders/details" element={<OrderDetails/>}/>
            <Route path="/admin/:uid/:slug/dashboard/product/:productId" element={<EditProduct/>}/>
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

