import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Store from "./pages/Store";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <AdminRoute>
              <Home />
            </AdminRoute>
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </div>
  );
};

export default App;
