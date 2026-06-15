const Product = require("../models/Product");

exports.listProduct = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 6,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const query = {
      name: { $regex: search, $options: "i" },
    };

    const products = await Product.find(query)
      .sort({
        [sort]: order === "desc" ? -1 : 1,
      })
      .skip(skip)
      .limit(limitNumber);

    const total = await Product.countDocuments(query);

    res
      .status(200)
      .json({
        message: "Data",
        products,
        total,
        currentPage: pageNumber,
        totalPage: Math.ceil(total / limitNumber),
      });
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
