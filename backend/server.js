import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./database.js"; // Import database connection

// Route Imports
import cartRoutes from "./routes/cartRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import usersRoutes from "./routes/usersRoute.js"
import algoliaRoutes from './routes/algoliaRoutes.js'

import syncAlgolia from './syncAlgolia.js'; 

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
 
// Routes
app.use("/cart", cartRoutes)
app.use("/products", productRoutes)
app.use("/users", usersRoutes)
app.use("/api", algoliaRoutes)


// Start function to connect DB, sync, and start server
async function startServer() {
  try {
    await connectToDatabase();  // connect to MongoDB
    await syncAlgolia();        // sync products to Algolia
    
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();