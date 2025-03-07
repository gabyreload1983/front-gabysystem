import { useState } from "react";
import Search from "../Search";
import ListCustomers from "./ListCustomers";
import { getCustomersByDescription } from "../../utils/data";

export default function SearchCustomers({ onHandleCustomerSelected }) {
  const [customers, setCustomers] = useState([]);

  const search = async (input) => {
    const data = await getCustomersByDescription(input);
    setCustomers(data);
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
      <Search
        onSearch={search}
        onClean={handleClean}
        searchDescription="Buscar Cliente"
      />
      <ListCustomers customers={customers} onHandleCLick={handleClick} />
    </>
  );
}
