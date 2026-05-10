import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadingSingleProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/product/" + id);
      setProduct(res.data.product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadingSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 🛡️ โล่ป้องกัน + อัปเกรด UI หน้า Loading หมุนๆ
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-50 to-gray-200 dark:from-slate-900 dark:to-gray-800 text-gray-800 dark:text-white transition-colors duration-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 dark:border-blue-400 border-solid mb-6 shadow-md"></div>
        <div className="text-lg font-bold animate-pulse text-gray-600 dark:text-gray-300">
          ⏳ กำลังโหลดสเปคสินค้า...
        </div>
      </div>
    );
  }

  // 🖥️ UI สเปคสินค้าเต็มรูปแบบ (รองรับ Dark Mode)
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-200 dark:from-slate-900 dark:to-gray-800 text-gray-800 dark:text-slate-100 p-6 md:p-12 font-sans transition-colors duration-500">
      <div className="max-w-3xl mx-auto pt-8 md:pt-10">
        {/* ปุ่มกดกลับหน้า Home พร้อมเอฟเฟกต์ Hover เลื่อนซ้าย */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-bold border border-gray-200 dark:border-slate-700 hover:-translate-x-1 text-blue-600 dark:text-blue-400"
        >
          ⬅️ กลับหน้าหลัก
        </Link>

        {/* การ์ดหลักโชว์ข้อมูล */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-white dark:border-slate-700 transition-all duration-300 relative overflow-hidden">
          {/* แสงลูกแก้วตกแต่งพื้นหลัง (Glow Effect) */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* ป้าย Tag ID สินค้า */}
          <div className="inline-block bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-mono font-bold px-4 py-1.5 rounded-full text-xs md:text-sm mb-6 border border-blue-100 dark:border-blue-800">
            🏷️ ID: {product._id}
          </div>

          {/* ชื่อสินค้า */}
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight wrap-break-word">
            {product.name}
          </h1>

          <hr className="my-8 border-gray-100 dark:border-slate-700" />

          {/* กล่องรายละเอียด / สเปค */}
          <div className="mb-10">
            <h3 className="text-xs md:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
              รายละเอียด / สเปคสินค้า
            </h3>
            <div className="bg-gray-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-slate-800 text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg wrap-break-word shadow-inner">
              {product.detail}
            </div>
          </div>

          {/* แถบราคา (เน้นสีเขียวมรกตดูพรีเมียม) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 md:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 gap-4">
            <div>
              <span className="block text-xs md:text-sm font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-widest">
                ราคาจำหน่าย
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 block">
                (อัปเดตข้อมูลล่าสุดจากฐานข้อมูล)
              </span>
            </div>
            {/* แปลงตัวเลขราคาให้มีลูกน้ำ (comma) อัตโนมัติ */}
            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              ฿{Number(product.price).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
