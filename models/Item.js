const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
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
      type: Number,
      required: [true, "Please provide item quantity"],
      default: 0, //can't have negative quantity
    },
    status: {
      type: "String",
      enum: ["in-stock", "out-of-stock", "backorder"],
      default: "in-stock",
      required: true,
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
