import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link, useFetcher } from "react-router-dom";
import dataProducts from "../data/produce.json";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const fetcher = useFetcher();
  // useFetcher, dùng tương tác ngầm với server 
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    sortBy: "",
  });/// xem lại
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // chặn load lại trang
    executeSearch(searchQuery, filter);
  };

  const executeSearch = (query, currentFilters = filter) => {
    const params = {};
    if (query.trim()) params.q = query.trim(); 
    // truy vấn hiển thị lên url
    if (currentFilters.category) params.category = currentFilters.category;

    setSearchParams(params);
    addHistory(query);
  };
  // Logic: gom tất cả chữ ở ô nhập và các bộ lọc (category) lại 
  // thành một Object,  
  // sau đó gọi setSearchParams 
  // để ép thanh URL phải thay đổi, đồng thời gọi hàm lưu lịch sử.

  // lọc q, category
  useEffect(() => {
    const queryParam = searchParams.get("q") || "";
    const categoryParam = searchParams.get("category") || "";

    setSearchQuery(queryParam);// điền ngược vào ô nhập
    // hiển thị những gì đang tìm
    setFilter((prev) => ({ ...prev, category: categoryParam }));
  }, [searchParams]);

  const addHistory = (keyword) => {
    if (!keyword.trim()) return;
    // thêm vào lịch sử
    setHistory((prevHistory) => {
      const newHistory = [
        keyword.trim(),
        ...prevHistory.filter((item) => item !== keyword.trim()),
        // gán lại nếu đã có 
      ];
      const limitedHistory = newHistory.slice(0, 5);
      // cắt lấy 5 mục gần nhất
      localStorage.setItem("recent_searches", JSON.stringify(limitedHistory));
      // lưu dưới dạng string
      return limitedHistory;
    });
  };

  // chạy 1 lần đọc danh sách tìm đã lưu
  useEffect(() => {
    const saved = localStorage.getItem("recent_searches");
    // nếu lưu, lưu dưới dạng string
    if (saved) setHistory(JSON.parse(saved));// chuyển đổi JSON
  }, []);// k render vô ích

  // Lọc dữ liệu theo URL Params
  const filteredProducts = useMemo(() => {
    const currentQuery = searchParams.get("q")?.toLowerCase() || "";
    const currentCategory = searchParams.get("category") || "";
    // lọc khi thay đổi url

    if (!currentQuery.trim() && !currentCategory) {
      return [];
    }// nếu chưa nhập , URL trống 
    // dừng và trả về mảng rỗng [] để tiết kiệm bộ nhớ.

    return dataProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(currentQuery);
      // biến thành chuỗi --> toLowerCase
      // kiểm tra mảng, object có giá trị hay k
      // biến chứa tên, sau khi tìm
      const matchesCategory = currentCategory
        ? product.category === currentCategory
        // sp có thuộc danh mục k?  
        : true;
        // nếu k, thì bỏ qua 
      return matchesSearch && matchesCategory;
    });// giữ lại khi thoã mãn 2 điều kiện
  }, [searchParams]);

  // Hàm helper để render một item sản phẩm (tránh lặp code)
  // tái sử dụng ở cả 3 nhánh hiển thị
  const renderProductItem = (product) => (
    <li
      key={product.id}
      className="p-2 bg-slate-50 rounded border border-slate-100 flex justify-between items-center text-sm text-gray-700"
    >
      <span>{product.name}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-blue-600">${product.price}</span>
        <fetcher.Form method="post" action="/cart">
    {/* <p>Dùng khi fetcher.state sẽ chuyển từ idle (rảnh) sang submitting hoặc loading. </p>
        <p>bấm liên tục gây trùng lặp đơn hàng.</p> */}

          <button
            type="submit"
            disabled={fetcher.state !== "idle"}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {fetcher.state !== "idle" ? "Đang thêm..." : "Thêm vào giỏ"}
          </button>
        </fetcher.Form>
        <Link
          to={`/produce/${product.id}`}
          className="text-xs text-blue-600 hover:underline font-medium"
        >
          Xem chi tiết →
        </Link>
      </div>
    </li>
  );

  // Kiểm tra xem người dùng đã thực hiện hành động tìm kiếm chưa (URL có params hay không)
  const isSearching = searchParams.get("q") || searchParams.get("category");

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md space-y-4">
      {/* Form tìm kiếm */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập từ khóa..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Tìm kiếm
        </button>
      </form>

      {/* Hiển thị Lịch sử tìm kiếm gần đây */}
      {history.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-1">
            Lịch sử tìm kiếm:
          </h3>
          <div className="flex flex-wrap gap-2">
            {history.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  setSearchQuery(item);
                  executeSearch(item, filter);
                }}
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full text-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hiển thị Kết quả */}
      <div className="pt-4 border-t border-gray-100">
        {filteredProducts.length > 0 ? (
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Kết quả tìm kiếm:</h3>
            <ul className="space-y-2">
              {filteredProducts.map(renderProductItem)}
            </ul>
          </div>
        ) : isSearching ? (
          // Trường hợp: Có bấm tìm kiếm nhưng KHÔNG ra kết quả phù hợp
          <div>
            <p className="text-sm text-red-500 italic mb-4 font-medium">
              ❌ Không tìm thấy sản phẩm phù hợp. Dưới đây là các sản phẩm gợi ý cho bạn:
            </p>
            <h3 className="font-bold text-gray-800 mb-2">Tất cả sản phẩm:</h3>
            <ul className="space-y-2">
              {dataProducts.map(renderProductItem)}
            </ul>
          </div>
        ) : (
          // Trường hợp: Vừa vào trang, chưa gõ tìm kiếm gì cả
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Sản phẩm hiện có:</h3>
            <ul className="space-y-2">
              {dataProducts.map(renderProductItem)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
