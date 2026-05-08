import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/product");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/api/product/" + id);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDetail(item.detail);
    setPrice(item.price);
    setEditId(item._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put("http://localhost:3000/api/product/" + editId, {
          name,
          detail,
          price,
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:3000/api/product/", {
          name,
          detail,
          price,
        });
      }
      loadData();
      setName("");
      setDetail("");
      setPrice("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-200 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 drop-shadow-sm transition-all duration-500 hover:scale-105">
          📦 ระบบจัดการสินค้า MERN
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 mb-12 flex flex-col md:flex-row gap-4 items-center border border-white"
        >
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="ชื่อสินค้า..."
            className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
          />
          <input
            type="text"
            required
            onChange={(e) => setDetail(e.target.value)}
            value={detail}
            placeholder="รายละเอียด..."
            className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
          />
          <input
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="ราคา (บาท)..."
            className="w-full md:w-48 px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
          />

          <button
            type="submit"
            className={`w-full md:w-auto px-5 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
              editId
                ? "bg-linear-to-r from-amber-400 to-orange-500 hover:shadow-orange-200"
                : "bg-linear-to-r from-blue-500 to-indigo-600 hover:shadow-blue-200"
            }`}
          >
            {editId ? "✨ อัปเดตข้อมูล" : " เพิ่มสินค้า"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-50 flex flex-col group"
            >
              <div className="grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {item.detail}
                </p>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-500 mb-6">
                  ฿{item.price}
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  ✏️ แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-50 text-red-600 font-semibold py-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  🗑️ ลบ
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-400 mt-10 animate-pulse">
            ยังไม่มีสินค้าในคลัง ลองเพิ่มดูสิ!
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
