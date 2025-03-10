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
import SearchSerie from "./components/Products/SearchSerie";
import Subscribers from "./pages/Subscribers/Subscribers";
import SubscriberDetail from "./pages/Subscribers/detail/SubscriberDetail";
import SubscriberList from "./pages/Subscribers/list/SubscriberList";
import SubscriberAdd from "./pages/Subscribers/add/SubscriberAdd";
import SubscriberAddEquipment from "./pages/Subscribers/edit/add/SubscriberAddEquipment";
import FormEditEquipment from "./pages/Subscribers/edit/equipment/FormEditEquipment";
import UpdateSubscriber from "./pages/Subscribers/edit/UpdateSubscriber";
import Replacements from "./pages/Replacements/Replacements";
import AddReplacement from "./pages/Replacements/add/AddReplacement";
import EditReplacement from "./pages/Replacements/edit/EditReplacement";
import ReplacemenstList from "./pages/Replacements/list/ReplacemenstList";
import ReplacementTechEdit from "./pages/ServiceWork/detail/ReplacementTechEdit";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROLES } from "./constants";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />

            <Route path="products/serie" element={<SearchSerie />} />
            <Route path="products" element={<Products />} />
            <Route path="product-request" element={<ProductRequest />} />

            <Route path="customers" element={<Customers />} />
            <Route
              path="customers/:id/serviceworks"
              element={<CustomerOrdersList />}
            />

            <Route path="servicework" element={<LayoutServiceWork />}>
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={[ROLES.TECHNICAL, ROLES.PREMIUM]}
                  />
                }
              >
                <Route
                  path="detail/:sid/replacement/:rid"
                  element={<ReplacementTechEdit />}
                />
              </Route>

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
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={[ROLES.PREMIUM, ROLES.SELLER]}
                  />
                }
              >
                <Route path="create" element={<CreateServiceWork />} />
              </Route>
              <Route path="edit/:id" element={<EditServiceWork />} />
              <Route
                path="edit/:id/customer"
                element={<EditCustomerServiceWork />}
              />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="register" element={<Register />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UserDetail />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[ROLES.PREMIUM]} />}>
              <Route path="summaries" element={<Summaries />} />
              <Route path="rma" element={<Rma />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[ROLES.PREMIUM]} />}>
              <Route path="replacements" element={<Replacements />}>
                <Route path="edit/:id" element={<EditReplacement />} />
                <Route path="list" element={<ReplacemenstList />} />
                <Route path="add" element={<AddReplacement />} />
              </Route>
            </Route>

            <Route path="subscribers" element={<Subscribers />}>
              <Route path="edit/:id" element={<UpdateSubscriber />} />
              <Route
                element={<ProtectedRoute allowedRoles={[ROLES.PREMIUM]} />}
              >
                <Route
                  path="edit/:id/add-equipment"
                  element={<SubscriberAddEquipment />}
                />
                <Route
                  path="detail/:id/edit-equipment/:uuid"
                  element={<FormEditEquipment />}
                />
                <Route path="add" element={<SubscriberAdd />} />
              </Route>
              <Route path="detail/:id" element={<SubscriberDetail />} />
              <Route path="list" element={<SubscriberList />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[ROLES.PREMIUM]} />}>
              <Route path="statistics" element={<LayoutStatistics />}>
                <Route
                  path="servicesworks"
                  element={<StatisticsServicesWorks />}
                />
                <Route path="technicals" element={<StatisticsTechnicals />} />
                <Route path="repairs" element={<StatisticsRepairs />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[ROLES.PREMIUM]} />}>
              <Route path="alexis" element={<Alexis />}>
                <Route path="sales" element={<Sales />} />
                <Route path="sales/:id" element={<SaleDetail />} />
                <Route path="account" element={<Account />} />
                <Route path="account/:id" element={<AccountDetail />} />
                <Route path="payment" element={<Payment />} />
              </Route>
            </Route>

            <Route path="*" element={<PageNotFount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
