import { useEffect, useState } from "react";
import { getFromApi } from "../../utils";
import ServiceWorkList from "./ServiceWorkList";

export default function ServiceWork({ url }) {
  const [serviceWorks, setServiceWorks] = useState([]);

  const getServiceWorks = async () => {
    const data = await getFromApi(url);

    setServiceWorks(data.payload);
  };

  useEffect(() => {
    getServiceWorks();
  }, []);

  return <ServiceWorkList serviceWorks={serviceWorks} />;
}
