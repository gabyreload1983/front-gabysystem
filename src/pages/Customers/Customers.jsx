import { useState } from "react";
import CustomersList from "./CustomersList";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search";
import { getCustomersBy, getSubscribersFromUrbano } from "../../utils/data";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  const onSearch = async (searchBy, value) => {
    const response = await getCustomersBy(searchBy, value);
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
          <Search onSearch={onSearch} onClean={onClean} />
          <button
            className="btn btn-info mt-2"
            onClick={handleSearchSubscribers}
          >
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
