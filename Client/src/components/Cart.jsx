import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

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
  return <div>{JSON.stringify(cart, null, 2)}</div>;
};

export default Cart;
