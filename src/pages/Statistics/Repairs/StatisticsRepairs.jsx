import { useState } from "react";
import Loading from "../../../components/Loading";
import CalendarPicker from "../../../components/CalendarPicker";
import moment from "moment";
import PieGraph from "../../../components/PieGraph";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSectorStatistics } from "../../../utils/tools";
import { getServiceWorks } from "../../../utils/data";

export default function StatisticsRepairs() {
  const navigate = useNavigate();
  const now = moment().format("YYYY-MM-DD");
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || now;
  const to = searchParams.get("to") || now;

  const [serviceWorksPc, setServiceWorksPc] = useState(false);
  const [serviceWorksPrinter, setServiceWorksPrinter] = useState(false);
  const [loader, setLoader] = useState(false);
  const [calendar, setCalendar] = useState({
    from: from,
    to: to,
  });

  const getData = async () => {
    setLoader(true);
    const data = await getServiceWorks(calendar.from, calendar.to);

    if (!data || data?.length === 0) return setLoader(false);

    const { dataPie: dataPiePc, options: optionsPc } = getSectorStatistics({
      data,
      sector: ".PC",
    });
    const { dataPie: dataPiePrinter, options: optionsPrinter } =
      getSectorStatistics({ data, sector: ".IMP" });

    setServiceWorksPc({ dataPiePc, optionsPc });
    setServiceWorksPrinter({ dataPiePrinter, optionsPrinter });
    setLoader(false);
  };

  const handleCalendarChange = (e) => {
    const { value, name } = e.target;
    const copyCalendar = { ...calendar };
    copyCalendar[name] = value;

    setCalendar(copyCalendar);
    navigate(
      `/statistics/repairs?from=${copyCalendar.from}&to=${copyCalendar.to}`
    );
  };

  useState(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {loader && <Loading />}
      <div className="row justify-content-center">
        <div className="col-12 col-md-4 col-lg-3 p-2">
          <CalendarPicker
            label="from"
            value={calendar.from}
            handleOnChange={handleCalendarChange}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-3 p-2">
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
