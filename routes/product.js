const express = require("express");
const router = require("express").Router();

const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    res.status(200).json({ message: "เซฟข้อมูลสำเร็จ", product: product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "ข้อมูลทั้งหมด", products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({ message: "เจอข้อมูลแล้ว", product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated", product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted", product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
