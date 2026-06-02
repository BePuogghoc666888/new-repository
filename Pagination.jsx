import React from "react";

// PHẦN 1: Nhận các biến điều khiển từ trang cha truyền vào qua Props
export default function Pagination({
  currentPage, // Trang hiện tại
  totalPages, // Tổng số trang
  onPageChange, // Hàm xử lý khi nhấn chuyển trang (do cha định nghĩa)
  itemsPerPage,
  handleItemsPerPageChange,
}) {
  // PHẦN 2: Điều kiện chặn (Nếu tổng số trang <= 1 thì ẩn luôn thanh phân trang)
  // if (totalPages <= 1) return null;

  // PHẦN 3: Trả về giao diện (JSX) sử dụng các Props trên
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Nút về trang đầu << */}

      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-5 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
      >
        «
      </button>

      {/* Nút lùi 1 trang < */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-5 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
      >
        ‹
      </button>

      {/* Hiển thị số trang */}
      <span className="text-sm font-medium px-2">
        Trang {currentPage} / {totalPages}
      </span>

      {/* Nút tiến 1 trang > */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-5 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
      >
        ›
      </button>

      {/* Nút đến trang cuối >> */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-5 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
      >
        »
      </button>
      <div>
        <div className="flex flex-col items-center gap-2">
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            <option value={2}>hiện thị 2</option>
            <option value={5}>hiện thị 5</option>
            <option value={10}>hiện thị 10</option>
            <option value={20}>hiện thị 20</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            className="px-5 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            onClick={() => handleItemsPerPageChange(2)}
          >
            chọn 2{" "}
          </button>
          <button
            className="px-5 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            onClick={() => handleItemsPerPageChange(5)}
          >
            chọn 5{" "}
          </button>
          <button
            className="px-5 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            onClick={() => handleItemsPerPageChange(10)}
          >
            chọn 10{" "}
          </button>
          <button
            className="px-5 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            onClick={() => handleItemsPerPageChange(20)}
          >
            chọn 20{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
