export default function About() {
  const codeString = `
import React, { useState } from 'react';

function TimKiemTen() {
  const [tuKhoa, setTuKhoa] = useState('');
  const danhSach = ['An', 'Bình', 'Cường', 'Dũng'];

  // Lọc danh sách, sử dụng toLowerCase() để so sánh chính xác
  const ketQuaLoc = danhSach.filter((ten) =>
    ten.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Nhập tên cần tìm..." 
        value={tuKhoa}
        // Cập nhật từ khóa khi người dùng gõ
        onChange={(e) => setTuKhoa(e.target.value)} 
      />
      
      <ul>
        {ketQuaLoc.map((ten, index) => (
          <li key={index}>{ten}</li>
        ))}
      </ul>
    </div>
  );
}

export default TimKiemTen;
`;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Về dự án này</h2>
      <p className="text-gray-600 leading-relaxed">
        Đây là ứng dụng minh họa cách tổ chức mã nguồn chuẩn công nghiệp. Dữ
        liệu được quản lý tập trung và phân tách rõ ràng theo mô hình khai báo
        mới của React Router, giúp tối ưu hiệu năng tải dữ liệu trước khi hiển
        thị màn hình (`Render-as-You-Fetch`).
      </p>
      <h1>code mẫu</h1>
      <p>
        1. Hàm includes() dùng để làm gì?Kết quả trả về: Luôn là kiểu đúng/sai
        (true hoặc false).Dùng để tìm kiếm cực kỳ nhanh chóng mà không cần viết
        các vòng lặp phức tạp.
        <br/><br/>
        <p>2. Hai trường hợp sử dụng chínhA. Tìm kiếm trong
        mảng (Array.includes())Kiểm tra xem một giá trị có nằm trong danh sách
        không.
        </p><br/>
        Ví dụ: Kiểm tra xem "Cam" có trong giỏ trái cây
        không.javascriptconst fruits = ['Táo', 'Cam', 'Xoài'];
        fruits.includes('Cam'); // Kết quả: true fruits.includes('Nho'); // Kết
        quả: false
      </p><br/><br/>
      <pre>
        <code>{codeString}</code>
      </pre>
    </div>
  );
}
