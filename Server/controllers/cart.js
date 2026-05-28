const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    console.log("productId", { productId });

    let cart = await Cart.findOne({ cartOwner: userId });
    if (!cart) {
      cart = new Cart({
        cartOwner: userId,
        products: [{ product: productId, amount: 1 }],
      });
      await cart.save();
    } else {
      const itemIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].amount += 1;
      } else {
        cart.products.push({ product: productId, amount: 1 });
      }
      await cart.save();
    }
    res.status(200).json({ message: "หยิบใส่ตะกร้าเรียบร้อย!", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ cartOwner: userId }).populate(
      "products.product",
    );
    res.status(200).json({ message: "ตะกร้าของคุณ:", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
