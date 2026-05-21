import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", form);

      localStorage.setItem("token", res.data.token);

      const decoded = jwtDecode(res.data.token);
      console.log("decoded: ", decoded);

      alert("Login Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTestAPI = async () => {
    try {
      const myToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/product",
        { name: "Diamond Sword", price: 5000 },
        {
          headers: {
            authtoken: myToken,
          },
        },
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logout Success");
    window.location.reload();
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="text"
              placeholder="username..."
              name="username"
              value={form.username}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>

        <div>
          <label>
            <input
              type="password"
              placeholder="password..."
              name="password"
              value={form.password}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>

        <button>Login</button>
        <button
          type="button"
          onClick={handleTestAPI}
          style={{ marginTop: "20px", backgroundColor: "orange" }}
        >
          ลองของ! ยิง API หลังบ้าน
        </button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
