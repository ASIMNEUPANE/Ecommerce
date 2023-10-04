const { Schema, model } = require("mongoose");
const commonSchema = require('../../utils/commonSchema')
const { ObjectId } = Schema.Types;

const orderSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String },
  amount: { type: Number, required: true },
  products: [
    {
      product: { type: ObjectId, ref: "Product", require:true },
      quantity:{type:Number, required:true},
      price:{type:Number, required:true},
      amoutn:{type:String, require:true}
    },
  ],
  paymentMethod:{type:String, enum:["COD", "CC", "Paypal"],default:"CODE" ,required:true},
  payment:{type:String, default:"COD"},
  status:{type:String , enum:["Pending", "Completed"], default:"Pending", required:true},
  ...commonSchema
})

module.exports = model("Order", orderSchema);
