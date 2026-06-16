import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
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
      const res = await axios.post("http://localhost:3000/api/register", form);
      console.log(res.data);

      alert("🎉 สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(
        "❌ เกิดข้อผิดพลาด: ชื่อผู้ใช้นี้อาจมีในระบบแล้ว หรือเซิร์ฟเวอร์มีปัญหา",
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 flex justify-center items-center p-6 font-sans antialiased text-slate-800">
      {/* การ์ด Register */}
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
        {/* แถบสีตกแต่งด้านบน */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-500 to-indigo-500"></div>

        {/* หัวข้อ */}
        <div className="text-center mb-10 mt-2">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600 tracking-tight mb-2">
            สร้างบัญชีใหม่
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            เข้าร่วมเป็นส่วนหนึ่งของร้าน MERN Store
          </p>
        </div>

        {/* ฟอร์มสมัครสมาชิก */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              ตั้งชื่อผู้ใช้ (Username)
            </label>
            <input
              type="text"
              placeholder="ตัวอักษรภาษาอังกฤษหรือตัวเลข..."
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              ตั้งรหัสผ่าน (Password)
            </label>
            <input
              type="password"
              placeholder="รหัสผ่านที่คาดเดาได้ยาก..."
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-95 mt-4"
          >
            ลงทะเบียน
          </button>
        </form>

        {/* ลิงก์กลับไปหน้า Login */}
        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          มีบัญชีอยู่แล้วใช่ไหม?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors underline decoration-2 underline-offset-4"
          >
            เข้าสู่ระบบที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
