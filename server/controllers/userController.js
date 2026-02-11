import Product from "../models/productSchema.js";
import Store from "../models/storeSchema.js";
import Cart from "../models/cartSchema.js";
import Review from "../models/reviewSchema.js";
import Orders from '../models/orderSchema.js'
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const allProducts = await Product.find()
      .populate("store", "storeSlug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!allProducts) {
      return res.status(404).json({
        success: false,
        message: "No Product avalible Yet.",
      });
    }
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      allProducts,
      hasMore: skip + allProducts.length < totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  const limit = 7;

  try {
    const stores = await Store.aggregate([
      { $match: { category: { $exists: true } } },

      // group by category
      {
        $group: {
          _id: "$category",
          store: { $first: "$$ROOT" },
        },
      },

      // make it random
      { $sample: { size: limit } },

      // clean output
      {
        $project: {
          _id: 0,
          category: "$_id",
          store: 1,
        },
      },
    ]);

    if (!stores) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }
    res.status(200).json({
      success: true,
      stores,
      message: "Store finded successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.aggregate([{ $sample: { size: 100 } }]);

    if (!stores) {
      return res.status(404).json({
        success: false,
        message: "No Store avalible yet!",
      });
    }

    res.status(200).json({
      success: true,
      stores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStoreBySlug = async (req, res) => {
  try {
    const storeSlug = req.params.slug;
    const store = await Store.findOne({ storeSlug }).populate(
      "owner",
      "name email phone address",
    );
    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store Not Found!",
      });
    }
    res.status(200).json({
      success: true,
      store,
    });
    console.log(store);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getParticularStoreProductBySlug = async (req, res) => {
  try {
    const storeSlug = req.params.slug;
    const store = await Store.findOne({ storeSlug });
    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store Not Found",
      });
    }
    const storeProducts = await Product.find({ store: store._id });
    if (!storeProducts) {
      return res.status(404).json({
        success: false,
        message: "No Product avalible Yet",
      });
    }
    res.status(200).json({
      success: true,
      storeProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const AddToCart = async (req, res) => {
  try {
    const userId = req.userId;

    const { color } = req.query;

    const { pId } = req.params;
    const product = await Product.findById(pId).select("_id stock");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // check if product already added to cart

    const cartItem = await Cart.findOne({
      product: pId,
      user: userId,
    });
    if (cartItem) {
      return res.status(422).json({
        success: false,
        message: "Product already exist.",
      });
    } else {
      const addToCart = new Cart({
        product: product,
        user: userId,
        quantity: 1,
        color: color || "",
      });
      await addToCart.save();
    }

    res.status(200).json({
      success: true,
      message: "product added successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddToCart = async (req, res) => {
  try {
    const userId = req.userId;

    const carts = await Cart.find({ user: userId }).populate({
      path: "product",
      populate: {
        path: "store",
      },
    });
    if (!carts) {
      return res.status(404).json({
        success: false,
        message: "No Addto Cart avalible Yet!",
      });
    }
    res.status(200).json({
      success: true,
      carts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body;

    const userId = req.userId;
    // ✅ Validate action
    if (!["inc", "dec"].includes(action)) {
      return res.status(400).json({
        message: "Invalid action",
      });
    }

    // ✅ Check product + stock
    const product = await Product.findById(productId).select("stock").lean();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // ✅ Get cart item

    const cartItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Item not in cart",
      });
    }

    // ✅ STOCK PROTECTION (CRITICAL)

    if (action === "inc" && cartItem.quantity >= product.stock) {
      return res.status(400).json({
        message: "No more stock available",
      });
    }

    // ✅ Prevent quantity < 1

    if (action === "dec" && cartItem.quantity <= 1) {
      return res.status(400).json({
        message: "Quantity cannot be less than 1",
      });
    }

    // ✅ Atomic Update

    const value = action === "inc" ? 1 : -1;

    await Cart.updateOne(
      { user: userId, product: productId },
      { $inc: { quantity: value } },
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const deletedItem = await Cart.deleteOne({
      _id: productId,
      user: userId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.error("Remove From Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pId } = req.params;
    const product = await Product.findById(pId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const ratingProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const { slug } = req.params;
    const { pId } = req.params;
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required.",
      });
    }
    const alreadyReviewed = await Review.findOne({
      user: userId,
      product: pId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product.",
      });
    }

    const addReview = new Review({
      user: userId,
      product: pId,
      storeSlug: slug,
      rating,
      comment,
    });

    await addReview.save();

    const stats = await Review.aggregate([
      {
        $match: {  product: new mongoose.Types.ObjectId(pId) },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          total: { $sum: 1 },
        },
      },
    ]);

    console.log(stats)

    await Product.findByIdAndUpdate(pId, {
      averageRating: stats[0]?.avgRating || 0,
      totalReviews: stats[0]?.total || 0,
    });

    res.status(200).json({
      success: true,
      message: "Product rated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getRatedProduct = async (req, res) => {
  try {
    const { pId } = req.params;
    const reviews = await Review.find({ product: pId }).populate("user");
    if (!reviews) {
      return res.status(400).json({
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getSearchProduct = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery?.trim();

    const query = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } }
      : {};

    const products = await Product.find(query).populate("store", "storeSlug");

    res.status(200).json({
      success: true,
      count: products.length, // ⭐ nice touch for frontend pagination later
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const orderProduct = async (req, res) => {
  const userId = req.userId;

  try {
    const carts = await Cart.find({ user: userId }).populate({
      path: "product",
      populate: {
        path: "store",
      },
    });
    if (!carts) {
      return res.status(404).json({
        success: false,
        message: "No Addto Cart avalible Yet!",
      });
    }

    carts.map((cart)=>{
      const newOrder = new Orders({
        user: userId,
        
      })
    })
  } catch (error) {
    console.log(error)
    
  }


  
}