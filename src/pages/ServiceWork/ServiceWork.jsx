import { useEffect, useState } from "react";
import ServiceWorkList from "./ServiceWorkList";
import Loading from "../../components/Loading";
import { getFromApi } from "../../utils/api";

export default function ServiceWork({ url }) {
  const [serviceWorks, setServiceWorks] = useState(null);

  const getServiceWorks = async () => {
    const data = await getFromApi(url);
    setServiceWorks(data.payload);
  };

  useEffect(() => {
    getServiceWorks();
  }, [url]);

  if (!serviceWorks) return <Loading />;

  return <ServiceWorkList serviceWorks={serviceWorks} />;
}
