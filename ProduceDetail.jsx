import { useLoaderData, Link } from "react-router-dom";
import React from "react";

export default function ProduceDetail() {
  const item = useLoaderData(); // Lấy đúng 1 sản phẩm đã được Router lọc qua id

  return (
    <div className="p-6 max-w-md mx-auto bg-white border rounded-2xl shadow-sm mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Chi tiết mặt hàng
      </h2>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Sản phẩm:</span> {item.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Số lượng:</span> {item.quantity}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Giá:</span> {item.price}đ
        </p>
      </div>
      <div className="mt-6 pt-4 border-t flex justify-between items-center">
        <Link to="/produce" className="text-sm text-blue-500 hover:underline">
          ← Tiếp tục mua sắm
        </Link>

        <Link to="/cart" className="text-sm text-gray-500 hover:underline">
          Xem giỏ hàng →
        </Link>
      </div>
    </div>
  );
}
