import { NavLink, Outlet } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  CubeIcon,
  ComputerDesktopIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { getInfoAllPendingServiceWorks } from "../../utils";

export default function LayoutServiceWork() {
  const { user } = useContext(UserContext);
  const [serviceWorksInfo, setServiecWorkInfo] = useState(null);

  const getData = async () => {
    const data = await getInfoAllPendingServiceWorks({ user });
    setServiecWorkInfo(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const links = [
    {
      name: "Pc",
      to: "pc",
      icon: ComputerDesktopIcon,
      quantity: serviceWorksInfo ? serviceWorksInfo["pc"] : 0,
    },
    {
      name: "Impresoras",
      to: "printers",
      icon: PrinterIcon,
      quantity: serviceWorksInfo ? serviceWorksInfo["printers"] : 0,
    },
    {
      name: "Proceso",
      to: "process",
      icon: ClipboardDocumentListIcon,
      quantity: serviceWorksInfo ? serviceWorksInfo["process"] : 0,
    },
    {
      name: "Mis Ordenes",
      to: "my-works",
      icon: CubeIcon,
      quantity: serviceWorksInfo ? serviceWorksInfo["myWorks"] : 0,
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
              <span className="bg-info px-2 py-1 rounded">{link.quantity}</span>
            </NavLink>
          );
        })}
      </div>
      <Outlet />
    </>
  );
}
