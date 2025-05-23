import express from "express"
import Product from "../models/productModel.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

router.post("/", async (req, res) => {
  try {
    const { name, price, description, stock } = req.body
    const newProduct = new Product({ name, price, description, stock })
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(500).json({ message: "Error saving product" })
  }
})

export default router
