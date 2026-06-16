import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

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
      const decoded = jwtDecode(res.data.token);
      const userRole = decoded.user.role;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);

      alert("เข้าสู่ระบบสำเร็จ!");

      if (userRole === "admin") {
        navigate("/");
      } else {
        navigate("/store");
      }
    } catch (error) {
      console.log(error);
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // เคลียร์ role ทิ้งด้วยเพื่อความชัวร์
    console.log("Logout Success");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 flex justify-center items-center p-6 font-sans antialiased text-slate-800">
      {/* การ์ด Login */}
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
        {/* หัวข้อ */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600 tracking-tight mb-2">
            ยินดีต้อนรับกลับมา
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            กรุณาเข้าสู่ระบบเพื่อจัดการร้าน MERN Store
          </p>
        </div>

        {/* ฟอร์มเข้าสู่ระบบ */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              ชื่อผู้ใช้ (Username)
            </label>
            <input
              type="text"
              placeholder="กรอกชื่อผู้ใช้ของคุณ..."
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              รหัสผ่าน (Password)
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-95 mt-2"
          >
            เข้าสู่ระบบ
          </button>

          {/* เส้นคั่น */}
          <div className="relative flex items-center py-4">
            <div className="grow border-t border-slate-200"></div>
            <span className="shrink-0 px-4 text-slate-400 text-xs font-semibold tracking-wider">
              โหมดนักพัฒนา
            </span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          {/* ปุ่มลองของ (Test API) */}
          <Link
            to={"/register"}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-sm transition-all duration-200 active:scale-95 flex justify-center items-center gap-2"
          >
            Register
          </Link>
        </form>

        {/* ปุ่ม Logout แบบอันตราย (Red) */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 flex justify-center items-center gap-2"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
