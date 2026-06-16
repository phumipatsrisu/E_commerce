import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/product");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          "http://localhost:3000/api/product/" + editId,
          { name, detail, price },
          { headers: { authtoken: token } },
        );
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:3000/api/product/",
          { name, detail, price },
          { headers: { authtoken: token } },
        );
      }
      alert(editId ? "อัปเดตข้อมูลสำเร็จ!" : "เพิ่มสินค้าสำเร็จ!");
      loadData();
      clearForm();
    } catch (error) {
      console.log(error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleDelete = async (id, productName) => {
    // เพิ่มระบบยืนยันก่อนลบ ป้องกันแอดมินมือลั่น!
    if (
      window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ "${productName}" ออกจากระบบ?`)
    ) {
      try {
        await axios.delete("http://localhost:3000/api/product/" + id, {
          headers: { authtoken: token },
        });
        loadData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDetail(item.detail);
    setPrice(item.price);
    setEditId(item._id);

    // เลื่อนหน้าจอกลับขึ้นไปข้างบนสุดเพื่อให้แอดมินเห็นฟอร์มแก้ไข
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearForm = () => {
    setName("");
    setDetail("");
    setPrice("");
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 p-6 md:p-12 font-sans antialiased text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อแดชบอร์ด */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-indigo-900 tracking-tight">
            ระบบจัดการคลังสินค้า
          </h1>
          <p className="text-slate-500 font-medium">
            เพิ่ม แก้ไข และลบข้อมูลสินค้า (Admin Only)
          </p>
        </header>

        {/* ฟอร์มจัดการข้อมูล */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 mb-12 relative overflow-hidden">
          {/* แถบสีตกแต่งด้านบนฟอร์ม */}
          <div
            className={`absolute top-0 left-0 w-full h-1.5 ${editId ? "bg-amber-400" : "bg-indigo-500"}`}
          ></div>

          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-700">
            {editId ? "✏️ แก้ไขข้อมูลสินค้า" : "📦 เพิ่มสินค้าใหม่"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center"
          >
            <div className="w-full">
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="ชื่อสินค้า..."
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 text-sm"
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                required
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
                placeholder="รายละเอียด..."
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 text-sm"
              />
            </div>

            <div className="w-full md:w-64 shrink-0">
              <input
                type="number"
                required
                min="0"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="ราคา (บาท)..."
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 text-sm"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto shrink-0">
              <button
                type="submit"
                className={`flex-1 md:flex-none px-6 py-3.5 rounded-xl font-bold text-white shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap ${
                  editId
                    ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200/50"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200/50"
                }`}
              >
                {editId ? "บันทึกการแก้ไข" : "+ เพิ่มเข้าคลัง"}
              </button>

              {/* ปุ่มยกเลิก จะโชว์ก็ต่อเมื่ออยู่ในโหมดแก้ไข */}
              {editId && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-4 py-3.5 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all duration-200 active:scale-95"
                >
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ตารางแสดงสินค้า (Grid) */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium text-lg animate-pulse">
              ยังไม่มีสินค้าในคลัง ลองเพิ่มดูสิ!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200/60 flex flex-col group relative"
              >
                {/* Badge สถานะ */}
                {editId === item._id && (
                  <span className="absolute -top-3 -right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-bounce">
                    กำลังแก้ไข
                  </span>
                )}

                <div className="grow">
                  <h2 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
                    {item.name}
                  </h2>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 min-h-10">
                    {item.detail}
                  </p>
                  <div className="text-2xl font-black text-indigo-600 mb-6">
                    ฿{Number(item.price).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-auto border-t border-slate-100 pt-4">
                  <Link
                    to={`/product/${item._id}`}
                    className="col-span-1 bg-slate-50 text-slate-600 hover:bg-slate-100 font-semibold py-2 rounded-lg transition-all duration-200 active:scale-95 text-center text-xs border border-slate-200/50 flex items-center justify-center"
                  >
                    รายละเอียด
                  </Link>
                  <button
                    onClick={() => handleEdit(item)}
                    className="col-span-1 bg-amber-50 text-amber-600 hover:bg-amber-100 font-semibold py-2 rounded-lg transition-all duration-200 active:scale-95 text-xs flex items-center justify-center gap-1"
                  >
                    ✏️ แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.name)}
                    className="col-span-1 bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold py-2 rounded-lg transition-all duration-200 active:scale-95 text-xs flex items-center justify-center gap-1"
                  >
                    🗑️ ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
