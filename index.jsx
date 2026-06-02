import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import UserList from "../pages/UserList";
import UserDetail from "../pages/UserDetail";
import usersData from "../data/users.json";
import App from "../App";
import cartData from "../data/cart.json";
import produceData from "../data/Produce.json";
import Produce from "../pages/Produce";

import Cart from "../pages/Cart";
import CartDetail from "../pages/CartDetail";
import ProduceDetail from "../pages/ProduceDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Base Layout chứa Navbar chung
    children: [
      {
        path: "app",
        element: <App />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <UserList />,
            // Data Model: Sử dụng loader để truyền dữ liệu JSON vào trang danh sách
            loader: () => usersData,
          },
          {
            path: ":id",
            element: <UserDetail />,
            // Data Model: Loader tìm user cụ thể dựa vào URL param :id
            loader: ({ params }) => {
              const user = usersData.find((u) => u.id === parseInt(params.id));
              if (!user) throw new Response("Not Found", { status: 404 });
              return user;
            },
          },
        ],
      },
      {
        path: "cart",
        // ✨ ĐÚNG CHUẨN: Đặt action ở route cha để bắt được mọi request POST đến "/cart"
        action: async ({ request }) => {
          const formData = await request.formData();
          const intent = formData.get("intent"); // "increase", "decrease", "remove"
          const id = parseInt(formData.get("id"));

          if (intent) {
            const item = cartData.find((c) => c.id === id);

            if (intent === "increase" && item) {
              item.quantity = (item.quantity || 1) + 1;
            } else if (intent === "decrease" && item) {
              item.quantity = (item.quantity || 1) - 1;
              if (item.quantity <= 0) {
                const index = cartData.indexOf(item);
                cartData.splice(index, 1);
              }
            } else if (intent === "remove" && item) {
              const index = cartData.indexOf(item);
              cartData.splice(index, 1);
            }
          } 
          // Nếu nhấn "Thêm vào giỏ" từ trang sản phẩm
          else {
            const name = formData.get("name");
            const price = parseFloat(formData.get("price"));
            const existingItem = cartData.find((c) => c.id === id);

            if (existingItem) {
              existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
              cartData.push({ id, name, price, quantity: 1 });
            }
          }

          return { success: true };
        },
        children: [
          {
            index: true,
            element: <Cart />,
            loader: () => cartData, // Loader giữ nguyên ở trang danh sách
          },
          {
            path: ":id",
            element: <CartDetail />,
            loader: ({ params }) => {
              const cart = cartData.find((c) => c.id === parseInt(params.id));
              if (!cart)
                throw new Response("Giỏ hàng không tồn tại", { status: 404 });
              return cart;
            },
          },
        ],
      },
      {
        path: "produce",
        children: [
          {
            index: true,
            element: <Produce />,
            loader: () => produceData,
          },
          {
            path: ":id",
            element: <ProduceDetail />,
            loader: ({ params }) => {
              const produce = produceData.find(
                (c) => c.id === parseInt(params.id),
              );
              if (!produce)
                throw new Response("Sản phẩm không tồn tại", { status: 404 });
              return produce;
            },
          },
        ],
      },
    ],
  },
]);
