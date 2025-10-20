import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "customer name is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "customer phone number is required"],
  },
  address: {
    type: String,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("customer", customerSchema);
