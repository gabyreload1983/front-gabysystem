import { Outlet } from "react-router-dom";
import StatisticsLinks from "./StatisticsLinks";

export default function LayoutStatistics() {
  return (
    <>
      <div className="d-flex flex-row text-white bg-dark m-2 rounded-2">
        <StatisticsLinks />
      </div>
      <Outlet />
    </>
  );
}
