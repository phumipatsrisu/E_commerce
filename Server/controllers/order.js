const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.saveOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ cartOwner: userId }).populate(
      "products.product",
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "ตะกร้าว่างเปล่า" });
    }

    const cartTotal = cart.products.reduce((sum, item) => {
      return sum + item.product.price * item.amount;
    }, 0);

    const newOrder = new Order({
      cartOrder: userId,
      products: cart.products,
      cartTotal: cartTotal,
    });

    await newOrder.save();

    cart.products = [];
    await cart.save();

    res.json({ message: "สั่งซื้อสำเร็จ!", order: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.find({ cartOwner: userId }).populate(
      "products.product",
    );

    res.json({ orders: cart });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
