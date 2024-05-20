import { useState } from "react";
import {
  filterServicesWorkBySector,
  getOrderTier,
  getServiceWorks,
  getStatisticsServicesWorks,
} from "../../../utils";
import Loading from "../../../components/Loading";
import CalendarPicker from "../../../components/CalendarPicker";
import moment from "moment";
import { colorsTiers } from "../../../constants";
import PieGraph from "../../../components/PieGraph";
import { useSearchParams } from "react-router-dom";

export default function StatisticsRepairs() {
  const now = moment().format("YYYY-MM-DD");
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || now;
  const to = searchParams.get("to") || now;

  const [serviceWorksPc, setServiceWorksPc] = useState(null);
  const [serviceWorksPrinter, setServiceWorksPrinter] = useState(null);
  const [loader, setLoader] = useState(false);
  const [calendar, setCalendar] = useState({
    from: from,
    to: to,
  });

  const getData = async () => {
    setLoader(true);
    const data = await getServiceWorks(calendar.from, calendar.to);

    const pcServiceWoks = getStatisticsServicesWorks(
      filterServicesWorkBySector(data, ".PC")
    );
    const itemsPc = pcServiceWoks.repairs.map((item, index) => [
      getOrderTier(index),
      item,
    ]);
    const dataPiePc = [["PC reparadas", "Cantidad"], ...itemsPc];
    const optionsPc = {
      title: `PCs Reparadas ${pcServiceWoks.repair}`,
      is3D: true,
      colors: colorsTiers,
    };

    const printerServiceWoks = getStatisticsServicesWorks(
      filterServicesWorkBySector(data, ".IMP")
    );
    const itemsPrinter = printerServiceWoks.repairs.map((item, index) => [
      getOrderTier(index),
      item,
    ]);
    const dataPiePrinter = [
      ["Impresoras Reparadas", "Cantidad"],
      ...itemsPrinter,
    ];
    const optionsPrinter = {
      title: `Impresoras Reparadas ${printerServiceWoks.repair}`,
      is3D: true,
      colors: colorsTiers,
    };

    setServiceWorksPc({ dataPiePc, optionsPc });
    setServiceWorksPrinter({ dataPiePrinter, optionsPrinter });
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
        {serviceWorksPc && (
          <>
            <div className="col-12 col-lg-6 p-2">
              <PieGraph
                data={serviceWorksPc.dataPiePc}
                options={serviceWorksPc.optionsPc}
              />
            </div>
          </>
        )}
        {serviceWorksPrinter && (
          <>
            <div className="col-12 col-lg-6 p-2">
              <PieGraph
                data={serviceWorksPrinter.dataPiePrinter}
                options={serviceWorksPrinter.optionsPrinter}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
