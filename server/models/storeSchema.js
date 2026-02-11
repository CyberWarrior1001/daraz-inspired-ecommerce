import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    storeSlug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    logo: {
      type: String, // image path or URL
    },

    banner: {
      type: String, // image path or URL
    },

    // 🔗 Reference to User (OWNER)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentMethods: [
      {
        type: String,
      },
    ],

    bankDetails: {
      type: String,
    },

    shippingArea: {
      type: String,
    },

    shippingFee: {
      type: Number,
      default: 0,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    returnPolicy: {
      type: String,
    },

    terms: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
