import { Outlet } from "react-router-dom";
import ServiceWorkLinks from "./ServiceWorkLinks";

export default function LayoutServiceWork() {
  return (
    <>
      <div className="d-flex flex-row text-white bg-dark m-2 rounded-2">
        <ServiceWorkLinks />
      </div>
      <Outlet />
    </>
  );
}
