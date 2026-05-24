import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role === "admin") {
    return children;
  }

  return (
    <>
      <Navigate to={"/login"} />
    </>
  );
};

export default AdminRoute;
