import { useEffect, useState } from "react";
import { getCustomerServiceWorks } from "../utils/data";

export function useCustomerServiceWorks({ id }) {
  const [customerServiceWorks, setCustomerServiceWorks] = useState([]);

  const getServiceWorks = async () => {
    const response = await getCustomerServiceWorks({ code: id });
    if (!response) return;
    setCustomerServiceWorks(response);
  };

  useEffect(() => {
    getServiceWorks();
  }, [id]);

  return { customerServiceWorks };
}
