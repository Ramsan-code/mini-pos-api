// console.log("eg");
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import customerRoutes from "./routes/customerRoutes.js";
import itemRoutes from "./routes/itemRoutes.js"
import saleRoutes from "./routes/saleRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // In serverless environments, we might not want to exit the process
    // but for now, we'll keep it as is if it's a critical failure.
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

app.get("/", (req, res) => {
  res.send("Mini POS API is running");
});

app.use("/api/users", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes); 
app.use("/api/sales", saleRoutes);

// Only listen if not in a serverless environment (optional, but good for Vercel)
if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  });
} else {
  connectDB();
}

export default app;
