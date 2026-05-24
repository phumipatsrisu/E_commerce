import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-200 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 drop-shadow-sm transition-all duration-500 hover:scale-105">
          MERN Store
        </h1>

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
                <Link
                  to={`/product/${item._id}`}
                  className="flex-1 bg-emerald-50  text-emerald-600 dark:text-emerald-400 font-semibold py-2.5 px-1 rounded-xl hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 text-center text-sm"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Store;
