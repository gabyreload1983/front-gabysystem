import { useState } from "react";
import Search from "../Search";
import ListCustomers from "./ListCustomers";
import { getCustomersBy } from "../../utils/data";

export default function SearchCustomers({ onHandleCustomerSelected }) {
  const [customers, setCustomers] = useState([]);

  const search = async (searchBy, value) => {
    const response = await getCustomersBy(searchBy, value);
    setCustomers(response);
  };
  const handleClick = async (customer) => {
    setCustomers([]);
    onHandleCustomerSelected(customer);
  };

  const handleClean = async () => {
    setCustomers([]);
  };

  return (
    <>
      <Search onSearch={search} onClean={handleClean} />
      <ListCustomers customers={customers} onHandleCLick={handleClick} />
    </>
  );
}
