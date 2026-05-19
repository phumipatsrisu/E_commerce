import { useState } from "react";
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

      alert("Login Successfully");
    } catch (error) {
      console.log(error);
    }
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
      </form>
    </div>
  );
};

export default Login;
