import { useLoaderData, Link, useFetcher } from "react-router-dom";
import React from "react";
import Search from "../components/Search";

export default function Produce() {
  const allProduce = useLoaderData();
  const fetcher = useFetcher(); 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Danh sách sản phẩm
      </h2>
      <Search />

      {/* <div className="space-y-4">
        {allProduce.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white border rounded-xl flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Giá: {item.price.toLocaleString()}đ
              </p>
            </div>
            
            <div className="flex items-center gap-4">

              <fetcher.Form method="post" action="/cart">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="name" value={item.name} />
                <input type="hidden" name="price" value={item.price} />
                <button
                  type="submit"
                  disabled={fetcher.state !== "idle"} // Vô hiệu hóa khi đang xử lý ngầm
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {fetcher.state !== "idle" ? "Đang thêm..." : "Thêm vào giỏ"}
                </button>
              </fetcher.Form>
              <Link
                to={`/produce/${item.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Xem chi tiết →
              </Link>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
