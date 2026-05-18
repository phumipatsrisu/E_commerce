import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
