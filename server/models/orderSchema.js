import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  productname:{
    type:String,
  },

  totalAmount:Number,

  paymentStatus:{
    type:String,
    enum:["pending","paid","failed"],
    default:"pending"
  },

  orderStatus:{
    type:String,
    enum:["processing","shipped","delivered"],
    default:"processing"
  }

},{timestamps:true})

export default mongoose.model("Orders", orderSchema);
