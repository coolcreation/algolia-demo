import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "./models/productModel.js"

dotenv.config()

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.URL)
    console.log("✅ Connected to MongoDB")

    const sampleProducts = [
      {
        baseName: "T-Shirt",
        description: "100% cotton, comfortable fit",
        brand: "CoolWear",
        categories: ["apparel", "tops"],
        variants: [
          {
            name: "T-Shirt - Red - M",
            price: 19.99,
            stock: 12,
            imageURL: ["https://example.com/red-m.jpg"]
          },
          {
            name: "T-Shirt - Red - L",
            price: 19.99,
            stock: 5,
            imageURL: ["https://example.com/red-l.jpg"]
          },
          {
            name: "T-Shirt - Blue - M",
            price: 21.99,
            stock: 8,
            imageURL: ["https://example.com/blue-m.jpg"]
          }
        ]
      }
    ]

    await Product.deleteMany()
    await Product.insertMany(sampleProducts)

    console.log("📦 Products seeded.")
    process.exit(0)
  } catch (err) {
    console.error("❌ Error seeding Products:", err)
    process.exit(1)
  }
}

seedProducts()
