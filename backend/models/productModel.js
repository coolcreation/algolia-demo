// models/productModel.js
import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: [{ type: String, required: false }],
  description: String,
  brand: { type: String, required: false },
  stock: Number
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)
export default Product
