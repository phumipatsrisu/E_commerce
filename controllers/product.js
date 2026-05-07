const Product = require("../models/Product");

exports.listProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Data", products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.listProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({ message: "Your Data", product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    res.status(200).json({ message: "Saved", product: product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.updateProduct = async (req, res) => {
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
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted", product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
