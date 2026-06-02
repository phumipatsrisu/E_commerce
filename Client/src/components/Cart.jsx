import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState({});
  const token = localStorage.getItem("token");

  const loadCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: { authtoken: token },
      });
      setCart(res.data.cart);
      console.log(cart);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCart();
  }, []);

  const handleIncrease = async (productId) => {
    await axios.post(
      "http://localhost:3000/api/cart/",
      { productId: productId },
      {
        headers: { authtoken: token },
      },
    );
    loadCart();
  };

  const handleDecrease = async (productId) => {
    await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
      headers: { authtoken: token },
    });
    loadCart();
  };
  return (
    <div>
      <h1 className="text-gray-800 bg-blue-200 text-2xl text-center">
        My Cart
      </h1>
      <h3>
        <Link to={"/store"} className="bg-green-100">
          ⬅️ Store
        </Link>
      </h3>
      {cart.products &&
        cart.products.map((item) => (
          <div key={item._id} className="m-1 p-3 bg-amber-50">
            <p>Name: {item.product.name}</p>
            <p>Price: {item.product.price}</p>
            <p>
              Amount: {item.amount}
              <button
                onClick={() => handleIncrease(item.product._id)}
                className="bg-blue-200 m-1 p-1"
              >
                +
              </button>
              <button
                onClick={() => handleDecrease(item.product._id)}
                className="bg-red-200 m-1 p-1"
              >
                -
              </button>
            </p>
            <p>Total: {item.product.price * item.amount}</p>
          </div>
        ))}
    </div>
  );
};

export default Cart;
