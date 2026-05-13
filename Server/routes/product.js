const express = require("express");
const router = require("express").Router();
const {
  listProduct,
  createProduct,
  listProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { authCheck } = require("../middleware/auth");

router.post("/", createProduct);
router.get("/", authCheck, listProduct);
router.get("/:id", listProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
