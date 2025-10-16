// console.log("eg");
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const app = express();

const PORT = 3000;
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv : Ramsan001 : 0740832001@mini-pos-api.dqgv9kh.mongodb.net/"
      )
      .then(() => console.log("conected mongodb "));
  } catch (error) {
    console.error(`error:${error}`);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
