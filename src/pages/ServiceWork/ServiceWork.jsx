import { useEffect, useState } from "react";
import { getFromApi } from "../../utils";
import ServiceWorkList from "./ServiceWorkList";
import Loading from "../../components/Loading";

export default function ServiceWork({ url }) {
  const [serviceWorks, setServiceWorks] = useState([]);

  const getServiceWorks = async () => {
    const data = await getFromApi(url);

    setServiceWorks(data.payload);
  };

  useEffect(() => {
    getServiceWorks();
  }, []);

  if (serviceWorks.length === 0) return <Loading />;

  return <ServiceWorkList serviceWorks={serviceWorks} />;
}
