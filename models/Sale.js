import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer is required"],
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
      },
    },
  ],
  total: {
    type: Number,
    required: [true, "Total is required"],
    min: [0, "Total cannot be negative"],
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'paid', 'cancelled'],
      message: '{VALUE} is not a valid status',
    },
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Sale", saleSchema);