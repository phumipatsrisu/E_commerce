const router = require("express").Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cart");
const { authCheck } = require("../middleware/auth");

router.post("/cart", authCheck, addToCart);
router.get("/cart", authCheck, getCart);
router.delete("/cart/clear", authCheck, clearCart);
router.delete("/cart/:productId", authCheck, removeFromCart);

module.exports = router;
