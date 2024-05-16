import { useState } from "react";
import {
  filterServicesWorkBySector,
  getServiceWorks,
  getStatisticsServicesWorks,
} from "../../../utils";
import Loading from "../../../components/Loading";
import CalendarPicker from "../../../components/CalendarPicker";
import moment from "moment";
import StatisticsSector from "./StatisticsSector";

export default function StatisticsRepairs() {
  const [serviceWorks, setServiceWorks] = useState(null);
  const [serviceWorksPc, setServiceWorksPc] = useState(null);
  const [serviceWorksPrinter, setServiceWorksPrinter] = useState(null);
  const [loader, setLoader] = useState(false);
  const now = moment().format("YYYY-MM-DD");
  const [calendar, setCalendar] = useState({
    from: now,
    to: now,
  });

  const getData = async () => {
    setLoader(true);
    const data = await getServiceWorks(calendar.from, calendar.to);
    const statistics = getStatisticsServicesWorks(data);
    const pc = getStatisticsServicesWorks(
      filterServicesWorkBySector(data, ".PC")
    );
    const printer = getStatisticsServicesWorks(
      filterServicesWorkBySector(data, ".IMP")
    );

    setServiceWorks(statistics);
    setServiceWorksPc(pc);
    setServiceWorksPrinter(printer);
    setLoader(false);
  };

  const handleCalendarChange = (e) => {
    const { value, name } = e.target;
    const copyCalendar = { ...calendar };
    copyCalendar[name] = value;

    setCalendar(copyCalendar);
  };

  useState(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {loader && <Loading />}
      <div className="row justify-content-center">
        <div className="col-6 col-md-4 col-lg-3">
          <CalendarPicker
            label="from"
            value={calendar.from}
            handleOnChange={handleCalendarChange}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <CalendarPicker
            label="to"
            value={calendar.to}
            handleOnChange={handleCalendarChange}
          />
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-8 col-lg-6">
          <button className="btn btn-info w-100" onClick={getData}>
            Aceptar
          </button>
        </div>
      </div>
      <div className="row mt-3">
        {serviceWorks && (
          <StatisticsSector title="Todo" statistics={serviceWorks} />
        )}
        {serviceWorksPc && (
          <StatisticsSector title="PC" statistics={serviceWorksPc} />
        )}
        {serviceWorksPrinter && (
          <StatisticsSector
            title="Impresoras"
            statistics={serviceWorksPrinter}
          />
        )}
      </div>
    </div>
  );
}
