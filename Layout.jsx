import { Outlet, NavLink } from "react-router-dom";
import { Home, Info, Users, ShoppingCart, Package } from "lucide-react";

export default function Layout() {
  const activeClass = ({ isActive }) => 
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">ReactDataRouter</h1>
          <nav className="flex gap-4">
            <NavLink to="/" className={activeClass}>
              <Home size={18} /> Trang chủ
            </NavLink>
            <NavLink to="/about" className={activeClass}>
              <Info size={18} /> Giới thiệu
            </NavLink>
            <NavLink to="/users" className={activeClass}>
              <Users size={18} /> Người dùng
            </NavLink>
            <NavLink to="/produce" className={activeClass}>
              <Package size={18} /> Sản phẩm
            </NavLink>
            <NavLink to="/cart" className={activeClass}>
              <ShoppingCart size={18} /> Giỏ hàng
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Nội dung thay đổi theo Router */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}