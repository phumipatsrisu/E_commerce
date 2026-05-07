import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const App = () => {
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
    loadData();
  }, []);

  // fn
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/api/product/" + id);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>รายการสินค้าจากหลังบ้าน</h1>
      <ul>
        {products.map((item) => (
          <li key={item._id}>
            ชื่อสินค้า: {item.name} | สเปค: {item.detail} | ราคา: {item.price}
            บาท <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
