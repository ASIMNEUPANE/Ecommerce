const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  product_name: { type: String, required: "Product name is required" },
  product_description: {
    type: String,
    required: "Product description is required",
  },
  product_type: { type: String, required: "Product type is required" },
  // product_gallery: { type: Array, required:"Product gallery is required"},
  product_price:{type:Number,required:"Product price is required"}
});


module.exports= model("Product", productSchema);