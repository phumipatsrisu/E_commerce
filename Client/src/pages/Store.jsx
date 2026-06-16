import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const loadData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/product?search=${search}&page=${page}&limit=6`,
      );
      setProducts(res.data.products);
      setTotalPage(res.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleAddToCart = async (item) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/cart",
        { productId: item._id },
        {
          headers: { authtoken: token },
        },
      );
      alert(`เพิ่ม ${item.name} ลงตะกร้าสำเร็จ!`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadData();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 md:p-12 font-sans antialiased text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อร้านค้า */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-indigo-950 tracking-tight">
            MERN Store
          </h1>
          <p className="text-slate-500 font-medium">
            ระบบจัดการและคลังสินค้าอัจฉริยะ
          </p>
        </header>

        {/* แถบเครื่องมือ: ปุ่มตะกร้า & ฟอร์มค้นหา */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-200/60 mb-8">
          <Link
            to={"/cart"}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-6 py-3 rounded-xl transition-all duration-200 active:scale-98"
          >
            <span>🛒</span> ตะกร้าของฉัน
          </Link>

          <form
            onSubmit={handleSearch}
            className="flex gap-2 w-full sm:max-w-md"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาสินค้าที่ต้องการ..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200 text-sm placeholder:text-slate-400 bg-slate-50/50"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-xs transition-all duration-200 active:scale-95 text-sm shrink-0"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {/* ตารางแสดงสินค้า (Grid) */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium text-lg">
              ไม่พบสินค้าที่ต้องการค้นหา
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 border border-slate-200/80 flex flex-col group relative overflow-hidden"
              >
                <div className="grow">
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                    {item.name}
                  </h2>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {item.detail || "ไม่มีรายละเอียดสินค้า"}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="text-2xl font-black text-indigo-600">
                    ฿{item.price.toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${item._id}`}
                      className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 text-xs border border-slate-200/60"
                    >
                      รายละเอียด
                    </Link>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 text-xs inline-flex items-center gap-1.5 shadow-xs"
                    >
                      + ใส่ตะกร้า
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ปุ่มเปลี่ยนหน้า (Pagination) */}
        {totalPage > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 bg-white w-fit mx-auto px-4 py-2 rounded-2xl shadow-xs border border-slate-200/60">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              ⬅️ หน้าก่อนหน้า
            </button>

            <span className="font-bold text-sm text-slate-600 px-2">
              {page} / {totalPage}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPage}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              หน้าถัดไป ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
