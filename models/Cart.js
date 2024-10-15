const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide item description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide item price"],
      min: 0.0, // can't have negative price
    },
    quantity: {
      // quantity of the item in stock is a dropdown selection
      type: Number,
      required: [true, "Please provide item quantity"],
      default: 0,
    },
    status: {
      type: "String",
      enum: ["in-stock", "out-of-stock", "pending"],
      default: "in-stock",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
