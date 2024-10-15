const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    createdBy: {
      // owner of the shopping cart
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    items: [ItemSchema], //array to track items in the cart
    totalPrice: {
      type: Number,
      required: true,
      min: 0.0,
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
