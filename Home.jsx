import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Chào mừng đến với hệ thống quản lý</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">Ứng dụng mẫu sử dụng React Router Data Model, Tailwind CSS và hệ thống icon hiện đại.</p>
      <Link to="/users" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-200">
        Khám phá danh sách User <ArrowRight size={18} />
      </Link>
      <h1 className="text-4xl font-bold text-red-500 underline bg-yellow-100 p-4">
        Kiểm tra Tailwind CSS!
      </h1>
    </div>
  );
}