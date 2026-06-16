import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem("token");

  const loadingSingleProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/product/" + id);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadingSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ✨ ฟีเจอร์เสริม: ให้ลูกค้ากดเพิ่มลงตะกร้าจากหน้านี้ได้เลย
  const handleAddToCart = async () => {
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/cart",
        { productId: product._id },
        { headers: { authtoken: token } },
      );
      alert(`เพิ่ม ${product.name} ลงตะกร้าสำเร็จ! 🛒`);
    } catch (error) {
      console.log(error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  // หน้าจอตอนกำลังโหลดข้อมูล (Loading State)
  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-center font-sans antialiased">
        <div className="relative flex justify-center items-center mb-6">
          <div className="absolute animate-ping w-12 h-12 rounded-full bg-indigo-400 opacity-20"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 border-solid shadow-md relative z-10"></div>
        </div>
        <div className="text-lg font-bold animate-pulse text-slate-500 tracking-wide">
          ⏳ กำลังโหลดข้อมูลสินค้า...
        </div>
      </div>
    );
  }

  // หน้าจอแสดงรายละเอียดสินค้า (Loaded State)
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 text-slate-800 p-6 md:p-12 font-sans antialiased">
      <div className="max-w-4xl mx-auto pt-4 md:pt-8">
        {/* ปุ่มย้อนกลับ */}
        <Link
          to="/store"
          className="inline-flex items-center gap-2 mb-8 bg-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 font-bold border border-slate-200 text-indigo-600 active:scale-95"
        >
          ⬅️ กลับหน้าร้านค้า
        </Link>

        {/* การ์ดรายละเอียดสินค้า */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden flex flex-col">
          {/* เอฟเฟกต์แสงตกแต่งมุมขวาบน */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* ป้าย ID สินค้า */}
          <div className="inline-block w-fit bg-slate-50 text-slate-400 font-mono font-semibold px-4 py-1.5 rounded-lg text-xs mb-6 border border-slate-200">
            🏷️ REF: {product._id}
          </div>

          {/* ชื่อสินค้า */}
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* กล่องรายละเอียด */}
          <div className="mb-10 grow">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              รายละเอียด / สเปคสินค้า
            </h3>
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed text-base md:text-lg whitespace-pre-wrap shadow-inner">
              {product.detail || "ไม่มีรายละเอียดระบุไว้สำหรับสินค้านี้"}
            </div>
          </div>

          {/* โซนราคาและปุ่มสั่งซื้อ */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-indigo-50/50 p-6 md:p-8 rounded-2xl border border-indigo-100/50 gap-6 mt-auto">
            {/* ราคา */}
            <div>
              <span className="block text-sm font-bold text-indigo-800 uppercase tracking-wider mb-1">
                ราคาจำหน่ายสุทธิ
              </span>
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600">
                ฿{Number(product.price).toLocaleString()}
              </div>
            </div>

            {/* ปุ่มเพิ่มลงตะกร้า */}
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-md transition-all duration-200 active:scale-95 flex justify-center items-center gap-3"
            >
              <span className="text-xl">🛒</span>
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
