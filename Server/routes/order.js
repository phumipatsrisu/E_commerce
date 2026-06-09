const { saveOrder } = require("../controllers/order");
const { authCheck } = require("../middleware/auth");

const router = require("express").Router();

router.post("/user/order", authCheck, saveOrder);

module.exports = router;
