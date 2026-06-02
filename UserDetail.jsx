import { useLoaderData, Link } from "react-router-dom";
import { ArrowLeft, Mail, Briefcase, Key } from "lucide-react";

export default function UserDetail() {
  // Đọc dữ liệu chi tiết của user duy nhất được bóc tách từ file JSON qua loader
  const user = useLoaderData();

  return (
    <div className="max-w-xl mx-auto">
      <Link to="/users" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
        <ArrowLeft size={16} /> Quay lại danh sách
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-6 pb-6 relative">
          {/* Avatar đè lên phần nền màu */}
          <div className="absolute -top-12 left-6">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white bg-gray-50" />
          </div>
          
          <div className="pt-16">
            <h2 className="text-2xl font-extrabold text-gray-900">{user.name}</h2>
            
            {/* Đọc các thuộc tính chi tiết của JSON */}
            <div className="mt-4 space-y-3 border-t border-b border-gray-100 py-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Key size={18} className="text-gray-400" />
                <span className="text-sm">ID hệ thống: <strong>{user.id}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Briefcase size={18} className="text-gray-400" />
                <span className="text-sm">Vai trò: <span className="text-semibold text-indigo-600">{user.role}</span></span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-gray-400" />
                <span className="text-sm">Email liên hệ: {user.email}</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Tiểu sử</h4>
              <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                {user.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}