const { saveOrder, getUserOrder } = require("../controllers/order");
const { authCheck } = require("../middleware/auth");

const router = require("express").Router();

router.post("/user/order", authCheck, saveOrder);
router.get("/user/order", authCheck, getUserOrder);
module.exports = router;
