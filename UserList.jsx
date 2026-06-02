import { useLoaderData, Link } from "react-router-dom";
import { Eye, Mail, ShieldCheck } from "lucide-react";
import Pagination from '../components/Pagination';
import React, { useState } from 'react'; 

export default function UserList() {
  const allUsers = useLoaderData();
  // gọi tất cả  = thư viện lấy data

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2); 
  // [1, 2]
  
  const indexOfLastItem = currentPage * itemsPerPage;
                  //  2    =     1         * 2
 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                //  0        =     2       -     2
 
  const currentItems = allUsers.slice(indexOfFirstItem, indexOfLastItem);
              // 1     =   all.slice(         0        ,        2        )
 
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

 

  const handleItemsPerPageChange = (newPaga)=>{
    setItemsPerPage(newPaga)
    setCurrentPage(1)

  }

  return (
    <div>
      {/* Tiêu đề trang */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh sách thành viên</h2>
        {/* Thanh phân trang */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
      
      {/* Danh sách User */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* SỬA TẠI ĐÂY: Duyệt qua danh sách đã cắt (currentItems) thay vì toàn bộ dữ liệu */}
        {currentItems.map((user) => (
          <div key={user.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full bg-gray-100 mb-4 border border-gray-200" />
            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
            
            <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full my-2">
              <ShieldCheck size={14} /> {user.role}
            </div>

            <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-6">
              <Mail size={14} /> {user.email}
            </div>

            <Link to={`/users/${user.id}`} className="mt-auto w-full inline-flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-xl transition-colors">
              <Eye size={16} /> Xem chi tiết
            </Link>
          </div>
        ))}
      </div>

    
    </div>
  );
}