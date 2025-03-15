import { useEffect, useState } from "react";
import { getServiceWork } from "../utils/data";

export function useServiceWork({ id }) {
  const [serviceWork, setServiceWork] = useState(null);

  const refreshServiceWork = async () => {
    const dataServiceWork = await getServiceWork({ nrocompro: id });
    setServiceWork(dataServiceWork);
  };

  useEffect(() => {
    refreshServiceWork();
  }, [id]);

  return { serviceWork, refreshServiceWork };
}
