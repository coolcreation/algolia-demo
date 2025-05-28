// models/productModel.js

import mongoose from "mongoose"

const variantSchema = new mongoose.Schema({
  name: String,               // select-dropdown list item:  "T-Shirt - Red - Large"
  price: Number,
  stock: Number,
  imageURL: [String],  // alt tag too!
  // sku: (always have sku),
  // quantity:  
}, { _id: false })

const productSchema = new mongoose.Schema({
  baseName: { type: String, required: true },  // e.g. "T-Shirt"
  description: String,
  brand: String,
  categories: [String],
  variants: [variantSchema], // embed variant-level info here
  // tags: [tshirts, red, xl, whatever],
  // sku:  (may or may not be populated),
  // quantity:  
}, { timestamps: true })

const product = mongoose.model("Product", productSchema)
export default product

