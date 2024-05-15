import { useState } from "react";
import { getServiceWorks } from "../../../utils";
import Loading from "../../../components/Loading";

export default function StatisticsRepairs() {
  const ordersStatistics = {
    in: 0,
    repair: 0,
    out: 0,
    stay: 0,
    pending: 0,
  };
  const [serviceWorks, setServiceWorks] = useState(ordersStatistics);
  const [loader, setLoader] = useState(false);

  const getData = async () => {
    setLoader(true);
    const data = await getServiceWorks("2024-02-01", "2024-02-29");
    ordersStatistics.in = data.length;
    data.forEach((serviceWork) => {
      if (serviceWork.estado === 23) ordersStatistics.repair++;
      if (serviceWork.estado === 23 && serviceWork.ubicacion === 22)
        ordersStatistics.out++;
      if (serviceWork.estado === 23 && serviceWork.ubicacion === 21)
        ordersStatistics.stay++;
      if (serviceWork.estado === 21 || serviceWork.estado === 22)
        ordersStatistics.pending++;
    });
    setServiceWorks(ordersStatistics);
    setLoader(false);
  };

  useState(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {loader && <Loading />}
      <div className="row">
        <p>Entreron: {serviceWorks.in}</p>
        <p>Reparaon: {serviceWorks.repair}</p>
        <p>Pendinetes: {serviceWorks.pending}</p>
        <p>Retiraon: {serviceWorks.out}</p>
        <p>No retiraron: {serviceWorks.stay}</p>
      </div>
    </div>
  );
}
