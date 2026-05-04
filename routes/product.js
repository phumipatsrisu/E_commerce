const express = require("express");
const router = require("express").Router();

const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    res.status(200).json({message:"เซฟข้อมูลสำเร็จ", product:product})
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
