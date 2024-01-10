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
import Statistics from "./pages/Statistics/Statistics";
import * as bootstrap from "bootstrap";
import OrderList from "./pages/OrderList/OrderList";
import Summaries from "./pages/Summaries/Summaries";
import UpdateCustomer from "./pages/Orders/UpdateCustomer";
import Alexis from "./pages/Alexis/Alexis";
import Sales from "./pages/Alexis/Sales";
import Balance from "./pages/Alexis/Balance";

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
            <Route path="orderList" element={<OrderList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/summaries" element={<Summaries />} />

            <Route path="alexis" element={<Alexis />}>
              <Route path="sales" element={<Sales />} />
              <Route path="balance" element={<Balance />} />
            </Route>

            <Route path="/orders/detail/:id" element={<OrderDetail />} />
            <Route
              path="/orders/update-customer"
              element={<UpdateCustomer />}
            />

            <Route path="orders" element={<OrdersLayout />}>
              <Route path="search" element={<Orders />} />
            </Route>

            <Route path="*" element={<PageNotFount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
