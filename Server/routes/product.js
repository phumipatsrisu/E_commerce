const express = require("express");
const router = require("express").Router();
const {
  listProduct,
  createProduct,
  listProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.post("/", createProduct);
router.get("/", listProduct);
router.get("/:id", listProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
