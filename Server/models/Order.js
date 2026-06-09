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
    CartTotal: {
      type: Number,
    },

    OrderStatus: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
