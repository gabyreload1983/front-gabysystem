import { useEffect, useState } from "react";
import { getStockControl } from "../utils/data";

export const useStockControl = ({ status }) => {
  const [stockControl, setStockControl] = useState([]);

  const getStockControlData = async () => {
    const response = await getStockControl({ status });
    setStockControl(response);
  };

  useEffect(() => {
    getStockControlData();
  }, []);

  return { stockControl, getStockControlData };
};
