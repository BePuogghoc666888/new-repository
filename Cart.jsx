import { useLoaderData, Link, useFetcher } from "react-router-dom"; // ✨ Đã sửa: Thêm useFetcher
import React from "react";

export default function Card() {
  const cart = useLoaderData();
  const fetcher = useFetcher(); // ✨ Bộ công cụ kích hoạt hàm tính toán ở router

  // tổng
  const total = cart.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Giỏ hàng của bạn
      </h1>

      {cart.length === 0 ? (
        <div className="text-gray-500">
          Giỏ hàng trống.{" "}
          <Link to="/produce" className="text-blue-600 underline">
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Danh sách sản phẩm trong giỏ */}
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white border rounded-xl flex justify-between items-center shadow-sm"
              >
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Giá: {item.price.toLocaleString()}đ
                  </p>
                  
                  {/* ✨ BỔ SUNG: Bộ nút bấm Tăng / Giảm / Xóa số lượng */}
                  <div className="flex items-center gap-2 mt-3">
                    {/* Nút Giảm số lượng */}
                    <fetcher.Form method="post" action="/cart">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="intent" value="decrease" />
                      <button type="submit" className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-sm transition-colors">
                        -
                      </button>
                    </fetcher.Form>

                    <span className="w-8 text-center font-medium text-gray-700">{item.quantity || 1}</span>

                    {/* Nút Tăng số lượng */}
                    <fetcher.Form method="post" action="/cart"> 
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="intent" value="increase" />
                      <button type="submit" className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-sm transition-colors">
                        +
                      </button>
                    </fetcher.Form>

                    {/* Nút Xóa hẳn sản phẩm */}
                    <fetcher.Form method="post" action="/cart">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="intent" value="remove" />
                      <button type="submit" className="ml-2 text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                        Xóa
                      </button>
                    </fetcher.Form>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    {(item.price * (item.quantity || 1)).toLocaleString()}đ
                  </p>
                  <Link
                    to={`/cart/${item.id}`}
                    className="text-xs text-gray-400 hover:underline block mt-1"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Hiển thị tổng tiền */}
          <div className="p-4 bg-gray-100 rounded-xl flex justify-between items-center font-bold text-lg">
            <span className="text-gray-700">Tổng cộng:</span>
            <span className="text-red-600">{total.toLocaleString()}đ</span>
          </div>
        </div>
      )}
    </div>
  );
}
