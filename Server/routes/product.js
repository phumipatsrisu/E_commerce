const express = require("express");
const router = require("express").Router();
const {
  listProduct,
  createProduct,
  listProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { authCheck, admidCheck } = require("../middleware/auth");

router.post("/", authCheck, admidCheck, createProduct);
router.get("/", listProduct);
router.get("/:id", listProductById);
router.put("/:id", authCheck, admidCheck, updateProduct);
router.delete("/:id", authCheck, admidCheck, deleteProduct);

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEwNThlNmI2YzFlOTI3ZGI2Y2ZkYWYxIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzc4NzQ5MDUxLCJleHAiOjE3Nzg4MzU0NTF9.nNZD8vlyTpbt2ruDloZX4qQM8gRNYC65kMjvRstWBdI