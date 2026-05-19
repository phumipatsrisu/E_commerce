import { useState } from "react";
import axios from "axios";

const Register = () => {
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
      const res = await axios.post("http://localhost:3000/api/register", form);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
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

        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
