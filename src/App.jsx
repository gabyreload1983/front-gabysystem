import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as bootstrap from "bootstrap";
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
import OrderList from "./pages/OrderList/OrderList";
import Summaries from "./pages/Summaries/Summaries";
import UpdateCustomer from "./pages/Orders/UpdateCustomer";
import Alexis from "./pages/Alexis/Alexis";
import Sales from "./pages/Alexis/Sales";
import Account from "./pages/Alexis/Account";
import SaleDetail from "./pages/Alexis/SaleDetail";
import Payment from "./pages/Alexis/Payment";
import AccountDetail from "./pages/Alexis/AccountDetail";
import LayoutServiceWork from "./pages/ServiceWork/LayoutServiceWork";
import ServiceWork from "./pages/ServiceWork/ServiceWork";
import Pc from "./pages/ServiceWork/Pc/Pc";
import Printers from "./pages/ServiceWork/Printers/Printers";
import Process from "./pages/ServiceWork/Process/Process";
import MyWorks from "./pages/ServiceWork/MyWorks/MyWorks";

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
              <Route path="sales/:id" element={<SaleDetail />} />
              <Route path="account" element={<Account />} />
              <Route path="account/:id" element={<AccountDetail />} />
              <Route path="payment" element={<Payment />} />
            </Route>

            <Route path="/orders/detail/:id" element={<OrderDetail />} />
            <Route
              path="/orders/update-customer"
              element={<UpdateCustomer />}
            />

            <Route path="orders" element={<OrdersLayout />}>
              <Route path="search" element={<Orders />} />
            </Route>

            <Route path="servicework" element={<LayoutServiceWork />}>
              <Route index element={<ServiceWork />} />
              <Route path="pc" element={<Pc />} />
              <Route path="printers" element={<Printers />} />
              <Route path="process" element={<Process />} />
              <Route path="my-works" element={<MyWorks />} />
            </Route>

            <Route path="*" element={<PageNotFount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
