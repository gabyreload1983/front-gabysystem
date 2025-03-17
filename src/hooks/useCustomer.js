import { useEffect, useState } from "react";
import { getCustomer } from "../utils/data";

export function useCustomer({ id }) {
  const [customer, setCustomer] = useState(null);

  const getCustomerData = async () => {
    const response = await getCustomer({ code: id });
    if (!response) return;
    setCustomer(response);
  };

  useEffect(() => {
    getCustomerData();
  }, [id]);

  return { customer };
}
