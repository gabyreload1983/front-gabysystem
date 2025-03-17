import { useEffect, useState } from "react";
import { getServiceWork } from "../utils/data";

export function useServiceWork({ id }) {
  const [serviceWork, setServiceWork] = useState(null);

  const getServiceWorkData = async () => {
    const dataServiceWork = await getServiceWork({ nrocompro: id });
    setServiceWork(dataServiceWork);
  };

  useEffect(() => {
    getServiceWorkData();
  }, [id]);

  return { serviceWork, getServiceWorkData };
}
