import { useEffect, useState } from "react";
import { getFromApi } from "../../utils";
import ServiceWorkList from "./ServiceWorkList";
import Loading from "../../components/Loading";

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
