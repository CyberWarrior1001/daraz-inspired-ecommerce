import User from "../models/authSchema.js";
import Store from "../models/storeSchema.js";
import Product from "../models/productSchema.js";
import fs from "fs";
import path from "path";

export const createShop = async (req, res) => {
  try {
    const {
      storeName,
      storeSlug,
      category,
      description,
      logo,
      banner,
      //   These all are owner details
      ownerName,
      email,
      phone,
      address,

      paymentMethods,
      bankDetails,
      shippingArea,
      shippingFee,
      visibility,
      returnPolicy,
      terms,
    } = req.body;
    console.log(req.body);

    const userId = req.userId;

    // ❌ Required validation
    if (!storeName || !category) {
      return res.status(400).json({
        success: false,
        message: "Store name and category are required",
      });
    }

    // 🧠 Generate slug if not provided
    if (!storeSlug) {
      const finalSlug =
        storeSlug ||
        slugify(storeName, {
          lower: true,
          strict: true,
        });
      storeSlug = finalSlug;
    }

    const slugExists = await Store.findOne({ storeSlug: storeSlug });
    if (slugExists) {
      return res.status(409).json({
        success: false,
        message: "Store slug already exists oR Provide a Slug",
      });
    }

    // 🏗 Create Store
    if (terms) {
      if (ownerName || email || phone || address) {
        const updatedOwner = await User.findOneAndUpdate(
          { userId },
          {
            $set: {
              ...(ownerName && { ownerName }),
              ...(email && { email }),
              ...(phone && { phone }),
              ...(address && { address }),
            },
          },
          { new: true }, // returns updated document
        );
      }

      const newStore = new Store({
        storeName,
        storeSlug,
        category,
        description,
        logo,
        banner,
        owner: userId, // 🔗 Ref to User
        paymentMethods,
        bankDetails,
        shippingArea,
        shippingFee,
        visibility,
        returnPolicy,
        terms,
      });

      await newStore.save();

      return res.status(201).json({
        success: true,
        message: "Store created successfully",
        store: newStore,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You must accept the Terms & Conditions to continue",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getShope = async (req, res) => {
  try {
    // Usage of store gitting data from it
    const userId = req.userId;
    const store = await Store.findOne({ owner: userId }).populate(
      "owner",
      "name email phone address",
    );

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found!",
      });
    }
    res.status(200).json({
      success: true,
      store,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Product

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      previous,
      category,
      subCategory,
      customCategory,
      stock,
      images,
      colors,
      flashSale,
    } = req.body;
    const userId = req.userId;
    if (
      !name ||
      !price ||
      !category ||
      !subCategory ||
      !stock ||
      !images ||
      !colors
    ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const storeId = await Store.findOne({ owner: userId }).distinct("_id");

    if (!storeId) {
      return res.status(404).json({
        success: false,
        message: "Store not found Pleas Creat Your store first.",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      previous,
      category,
      subCategory,
      customCategory,
      stock,
      images,
      colors,
      flashSale,
      store: storeId,
    });
    await newProduct.save();
    return res.status(200).json({
      success: true,
      newProduct,
      message: "Product added successfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get product by id

export const getProductById = async (req, res) => {
  try {
    const pid = req.params.productId;
    const userId = req.userId;
    const storeId = await Store.findOne({ owner: userId }).distinct("_id");
    if (!storeId) {
      return res.status(404).json({
        success: false,
        message: "Store not found Pleas Creat Your store first.",
      });
    }

    const products = await Product.findOne({ _id: pid, store: storeId });
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const storeId = await Store.findOne({ owner: userId }).distinct("_id");
    if (!storeId) {
      return res.status(404).json({
        success: false,
        message: "Store not found Pleas Creat Your store first.",
      });
    }

    const products = await Product.find({ store: storeId });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProdect = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(req.params.id);

    const storeId = await Store.findOne({ owner: userId }).distinct("_id");
    if (!storeId) {
      return res.status(404).json({
        success: false,
        message: "Store not found Pleas Creat Your store first.",
      });
    }

    const deletedProduct = await Product.findOneAndDelete({
      store: storeId,
      _id: req.params.id,
    });

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found or unauthorized",
      });
    }

    deletedProduct.images?.forEach((imgUrl) => {
      const relativePath = imgUrl.replace("http://localhost:3000", "");
      if (!relativePath.startsWith("/uploads/")) return;

      const filePath = path.join(process.cwd(), relativePath);
      console.log(filePath);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Image delete failed:", err.message);
        }
      });
    });
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      previous,
      category,
      subCategory,
      customCategory,
      stock,
      colors,
      flashSale,
    } = req.body;

    const pid = req.params.productId;
    const userId = req.userId;
    const storeId = await Store.findOne({ owner: userId }).distinct("_id");
    if (!storeId) {
      return res.status(404).json({
        success: false,
        message: "Store not found Pleas Creat Your store first.",
      });
    }

    const product = await Product.findOne({ _id: pid, store: storeId });

    console.log(" this is product");
    console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found!",
      });
    }

    const allowedFields = [
      "name",
      "description",
      "price",
      "previous",
      "category",
      "subCategory",
      "customCategory",
      "stock",
      "colors",
      "flashSale",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
