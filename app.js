// console.log("eg");
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

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
app.use("/api/customers", customerRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
export default app;
