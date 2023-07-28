import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Customers from "./pages/Customers/Customers";
import Products from "./pages/Products/Products";
import Profile from "./pages/Profile/Profile";
import OrdersLayout from "./components/OrdersLayout";
import Layout from "./components/Layout";
import UserContextProvider from "./context/userContext";
import OrderDetail from "./pages/Orders/OrderDetail/OrderDetail";
import PageNotFount from "./components/PageNotFount";
import Users from "./pages/Users/Users";
import UserDetail from "./pages/Users/UserDetail";
import Orders from "./pages/Orders/Orders";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="orders" element={<OrdersLayout />}>
              <Route path="search/:filter" element={<Orders />} />

              <Route path="detail/:id" element={<OrderDetail />} />
            </Route>

            <Route path="*" element={<PageNotFount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
