const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    // ระบุเจ้าของตะกร้า
    cartOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Product list (array)
    product: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        amount: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);
