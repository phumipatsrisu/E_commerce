const router = require("express").Router();
const { addToCart } = require("../controllers/cart");
const { authCheck } = require("../middleware/auth");

router.post("/cart", authCheck, addToCart);

module.exports = router;
