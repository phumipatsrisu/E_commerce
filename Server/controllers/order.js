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
    let order = await Order.find({ cartOrder: userId }).populate(
      "products.product",
    );

    res.json({ orders: order });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    let order = await Order.findById(orderId).populate("products.product");

    if (!order || order.cartOrder.toString() !== userId) {
      return res.status(404).json({ message: "ไม่พบใบสั่งซื้อนี้" });
    }
    res.json({ orders: order });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
