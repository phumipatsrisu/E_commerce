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

router.post("/", authCheck, createProduct);
router.get("/", listProduct);
router.get("/:id", listProductById);
router.put("/:id", authCheck, updateProduct);
router.delete("/:id", authCheck, deleteProduct);

module.exports = router;
