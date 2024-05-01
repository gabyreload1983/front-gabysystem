import { NavLink, Outlet } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  CubeIcon,
  ComputerDesktopIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

export default function LayoutServiceWork() {
  const links = [
    {
      name: "Pc",
      to: "pc",
      icon: ComputerDesktopIcon,
    },
    {
      name: "Impresoras",
      to: "printers",
      icon: PrinterIcon,
    },
    {
      name: "Proceso",
      to: "process",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Mis Ordenes",
      to: "my-works",
      icon: CubeIcon,
    },
  ];

  return (
    <>
      <div className="d-flex flex-row text-white bg-dark m-2 rounded-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              className="navLink flex-fill p-2 d-flex align-items-center gap-2 flex-row justify-content-center justify-content-xl-start"
              to={link.to}
            >
              <Icon className="icon" />
              <p className="d-none d-xl-block m-0">{link.name}</p>
            </NavLink>
          );
        })}
      </div>
      <Outlet />
    </>
  );
}
