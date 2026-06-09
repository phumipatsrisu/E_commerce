const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cartOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        amount: {
          type: Number,
        },
      },
    ],
    cartTotal: {
      type: Number,
    },

    orderStatus: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
