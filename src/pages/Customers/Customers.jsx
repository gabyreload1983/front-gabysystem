import { useState } from "react";
import CustomersList from "./CustomersList";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search";
import {
  getCustomersByDescription,
  getSubscribersFromUrbano,
} from "../../utils/data";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  const onSearch = async (description) => {
    const response = await getCustomersByDescription(description);
    setCustomers(response);
  };

  const handleSearchSubscribers = async () => {
    const data = await getSubscribersFromUrbano();
    setCustomers(data);
  };

  const onClean = () => {
    setCustomers([]);
  };

  const handleCustomerSelected = (customer) => {
    navigate(`/customers/${customer.codigo}/serviceworks`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-4 mt-5 mb-2">
          <Search
            onSearch={onSearch}
            onClean={onClean}
            searchDescription="Cliente"
          />
          <button className="btn btn-info" onClick={handleSearchSubscribers}>
            Abonados
          </button>
        </div>
        <div className="col-12">
          <CustomersList
            customers={customers}
            onHandleCustomerSelected={handleCustomerSelected}
          />
        </div>
      </div>
    </div>
  );
}
