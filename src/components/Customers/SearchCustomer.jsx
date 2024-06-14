import { useState } from "react";
import Search from "../Search";
import ListCustomers from "./ListCustomers";
import { getCustomers } from "../../utils";

export default function SearchCustomer() {
  const [customers, setCustomers] = useState([]);

  const search = async (input) => {
    const data = await getCustomers(input);
    setCustomers(data);
    console.log(data);
  };
  const handleClick = async (customer) => {
    console.log(customer);
  };

  const handleClean = async () => {
    setCustomers([]);
  };

  return (
    <div>
      <Search onSearch={search} onClean={handleClean} />
      <ListCustomers customers={customers} onHandleCLick={handleClick} />
    </div>
  );
}
