const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const { commonSchema } = require("../../utils/commonSchema");

const productSchema = new Schema({
  name: { type: String, required: "Product name is required" },
  alias:[{ type: String, required: true, unique: true }], 
  description: {
    type: String,
    required: "Product description is required",
    maxLength: 250,
  },
  type: {
    type: String,
    required: "Product type is required",
    minLength: 1,
    maxLength: 15,
  },
  quantity: { type: String, required: true, minLength: 1, maxLength: 100000 },
  category: { type: ObjectId, ref: "Category" },

  price: {
    type: Number,
    required: "Product price is required",
    minLength: 1,
    maxLength: 4,
  },
  images: [{ type:String}],
  isRelease: { type: Boolean, default: false },
  ...commonSchema,
});

module.exports = model("Product", productSchema);
