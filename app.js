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
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("conected mongodb ");
  } catch (error) {
    console.error(`error:${error}`);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send("hello express");
});
app.use("/api/users", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes); 
app.use("/api/sales",saleRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
export default app;
