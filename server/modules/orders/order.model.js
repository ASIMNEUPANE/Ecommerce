const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");
const {ObjectId} = Schema.Types

const orderSchema = new Schema({
  id: { type: String, required: true, index: {unique: true }},
  name: { type: String, required: true },
  email: { type: String },
  
  address: { type: String },
  amount: { type: Number, required: true },
  products: [
    {
      product: { type: ObjectId,ref:"Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
  ],
  paymentMethod: {
    type: String,
    enum: ["COD", "STRIPE"],
    default: "COD",
    
  },
  orderId:{type:String}
  ,
  payment: { type: String, default: "COD" },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Expired"],
    default: "Pending",
    
  },
  ...commonSchema,
});

module.exports = model("Order", orderSchema);
