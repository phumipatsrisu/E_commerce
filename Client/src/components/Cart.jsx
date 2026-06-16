import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState({});
  const token = localStorage.getItem("token");

  const loadCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: { authtoken: token },
      });
      setCart(res.data.cart || { products: [] });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    loadCart();
  }, []);

  const handleIncrease = async (productId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/cart/",
        { productId: productId },
        { headers: { authtoken: token } },
      );
      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
        headers: { authtoken: token },
      });
      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างตะกร้าสินค้าทั้งหมด?")) {
      try {
        await axios.delete("http://localhost:3000/api/cart/clear", {
          headers: { authtoken: token },
        });
        loadCart();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ฟังก์ชันช่วยคำนวณยอดรวมทั้งตะกร้า
  const calculateGrandTotal = () => {
    if (!cart.products) return 0;
    return cart.products.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 p-6 md:p-12 font-sans antialiased text-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* แถบนำทางกลับหน้าร้าน */}
        <div className="mb-6">
          <Link
            to={"/store"}
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-100 active:scale-95"
          >
            ⬅️ กลับไปเลือกซื้อสินค้า
          </Link>
        </div>

        {/* หัวข้อตะกร้า */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-indigo-900 tracking-tight">
            ตะกร้าสินค้าของฉัน 🛒
          </h1>
        </header>

        {/* เช็คว่าตะกร้าว่างหรือไม่ */}
        {!cart.products || cart.products.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-slate-100 flex flex-col items-center justify-center">
            <span className="text-6xl mb-4 opacity-50">🛍️</span>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">
              ตะกร้าของคุณยังว่างเปล่า
            </h2>
            <p className="text-slate-500 mb-8">
              ลองไปค้นหาสินค้าที่ถูกใจในหน้าร้านดูสิ!
            </p>
            <Link
              to={"/store"}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-95"
            >
              ไปช้อปปิ้งกันเลย
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* รายการสินค้าในตะกร้า (ฝั่งซ้าย) */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
              {cart.products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-slate-500 text-sm">
                      ราคาต่อชิ้น: ฿
                      {Number(item.product.price).toLocaleString()}
                    </p>
                  </div>

                  {/* ตัวควบคุมจำนวนสินค้า */}
                  <div className="flex items-center gap-4 bg-slate-50 px-2 py-1.5 rounded-xl border border-slate-200">
                    <button
                      onClick={() => handleDecrease(item.product._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 font-bold shadow-sm hover:bg-slate-100 active:scale-90 transition-all"
                    >
                      -
                    </button>
                    <span className="font-bold text-slate-800 w-6 text-center">
                      {item.amount}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.product._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-sm hover:bg-indigo-700 active:scale-90 transition-all"
                    >
                      +
                    </button>
                  </div>

                  {/* ราคารวมต่อชิ้น */}
                  <div className="text-right sm:w-24">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">
                      รวม
                    </p>
                    <p className="text-lg font-black text-indigo-600">
                      ฿{(item.product.price * item.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* สรุปยอดสั่งซื้อ (ฝั่งขวา) */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 sticky top-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">
                  สรุปคำสั่งซื้อ
                </h2>

                <div className="flex justify-between items-center mb-4 text-slate-600">
                  <span>จำนวนสินค้า</span>
                  <span className="font-semibold">
                    {cart.products.length} รายการ
                  </span>
                </div>

                <div className="flex justify-between items-center mb-6 text-slate-600">
                  <span>ค่าจัดส่ง</span>
                  <span className="font-semibold text-emerald-500">ฟรี</span>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-slate-100 mb-8">
                  <span className="text-lg font-bold text-slate-800">
                    ยอดชำระสุทธิ
                  </span>
                  <span className="text-2xl font-black text-indigo-600">
                    ฿{calculateGrandTotal().toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-200 active:scale-95">
                    ดำเนินการสั่งซื้อ
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 text-sm"
                  >
                    ล้างตะกร้าสินค้า
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
