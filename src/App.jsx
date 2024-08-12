import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as bootstrap from "bootstrap";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Customers from "./pages/Customers/Customers";
import Products from "./pages/Products/Products";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout";
import UserContextProvider from "./context/userContext";
import PageNotFount from "./components/PageNotFount";
import Users from "./pages/Users/Users";
import UserDetail from "./pages/Users/UserDetail";
import ProductRequest from "./pages/ProductRequest/ProductRequest";
import Summaries from "./pages/Summaries/Summaries";
import Alexis from "./pages/Alexis/Alexis";
import Sales from "./pages/Alexis/Sales";
import Account from "./pages/Alexis/Account";
import SaleDetail from "./pages/Alexis/SaleDetail";
import Payment from "./pages/Alexis/Payment";
import AccountDetail from "./pages/Alexis/AccountDetail";
import LayoutServiceWork from "./pages/ServiceWork/LayoutServiceWork";
import Pc from "./pages/ServiceWork/Pc/Pc";
import Printers from "./pages/ServiceWork/Printers/Printers";
import Process from "./pages/ServiceWork/Process/Process";
import MyWorks from "./pages/ServiceWork/MyWorks/MyWorks";
import ServiceWorkDetail from "./pages/ServiceWork/detail/ServiceWorkDetail";
import EditServiceWorkProducts from "./pages/ServiceWork/edit/products/EditServiceWorkProducts";
import LayoutStatistics from "./pages/Statistics/LayoutStatistics";
import StatisticsTechnicals from "./pages/Statistics/Technicals/StatisticsTechnicals";
import StatisticsRepairs from "./pages/Statistics/Repairs/StatisticsRepairs";
import StatisticsServicesWorks from "./pages/Statistics/ServicesWorks/StatisticsServicesWorks";
import Filter from "./pages/ServiceWork/Filter/Filter";
import CreateServiceWork from "./pages/ServiceWork/create/CreateServiceWork";
import EditServiceWork from "./pages/ServiceWork/edit/EditServiceWork";
import CustomerOrdersList from "./pages/Customers/CustomerOrdersList";
import EditCustomerServiceWork from "./pages/ServiceWork/edit/customer/EditCustomerServiceWork";
import Rma from "./pages/RMA/Rma";

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
            <Route path="products" element={<Products />} />
            <Route path="product-request" element={<ProductRequest />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/summaries" element={<Summaries />} />
            <Route path="/rma" element={<Rma />} />

            <Route path="customers" element={<Customers />} />
            <Route
              path="customers/:id/serviceworks"
              element={<CustomerOrdersList />}
            />

            <Route path="/statistics" element={<LayoutStatistics />}>
              <Route
                path="servicesworks"
                element={<StatisticsServicesWorks />}
              />
              <Route path="technicals" element={<StatisticsTechnicals />} />
              <Route path="repairs" element={<StatisticsRepairs />} />
            </Route>

            <Route path="alexis" element={<Alexis />}>
              <Route path="sales" element={<Sales />} />
              <Route path="sales/:id" element={<SaleDetail />} />
              <Route path="account" element={<Account />} />
              <Route path="account/:id" element={<AccountDetail />} />
              <Route path="payment" element={<Payment />} />
            </Route>

            <Route path="servicework" element={<LayoutServiceWork />}>
              <Route path="detail/:id" element={<ServiceWorkDetail />} />
              <Route
                path="edit/products/:id"
                element={<EditServiceWorkProducts />}
              />
              <Route path="pc" element={<Pc />} />
              <Route path="printers" element={<Printers />} />
              <Route path="process" element={<Process />} />
              <Route path="my-works" element={<MyWorks />} />
              <Route path="filter" element={<Filter />} />
              <Route path="create" element={<CreateServiceWork />} />
              <Route path="edit/:id" element={<EditServiceWork />} />
              <Route
                path="edit/:id/customer"
                element={<EditCustomerServiceWork />}
              />
            </Route>

            <Route path="*" element={<PageNotFount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
