const router = require("express").Router();
const { addToCart, getCart } = require("../controllers/cart");
const { authCheck } = require("../middleware/auth");

router.post("/cart", authCheck, addToCart);
router.get("/cart", authCheck, getCart);

module.exports = router;
