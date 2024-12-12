import { Outlet } from "react-router-dom";

export default function Replacements() {
  return (
    <div className="container-fluid">
      <h2 className="text-center">REPUESTOS</h2>
      <Outlet />
    </div>
  );
}
