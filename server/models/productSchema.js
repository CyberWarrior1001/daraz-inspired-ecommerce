import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    previous: {
      type: Number, // previous price
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
    },

    customCategory: {
      type: String,
    },

    stock: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String, // image URL / path
      },
    ],

    colors: [
      {
        type: String,
      },
    ],

    flashSale: {
      type: Boolean,
      default: false,
    },

    // 🔗 RELATIONS
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
