import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { getInfoAllPendingServiceWorks } from "../../utils";
import {
  ClipboardDocumentListIcon,
  ComputerDesktopIcon,
  CubeIcon,
  PrinterIcon,
  DocumentMagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/16/solid";
import { validateCreateServiceWork } from "../../utils/validation";

export default function ServiceWorkLinks() {
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
      quantity: serviceWorksInfo ? serviceWorksInfo["pc"] : null,
    },
    {
      name: "Impresoras",
      to: "printers",
      icon: PrinterIcon,
      quantity: serviceWorksInfo ? serviceWorksInfo["printers"] : null,
    },
    {
      name: "Proceso",
      to: "process",
      icon: ClipboardDocumentListIcon,
      quantity: serviceWorksInfo ? serviceWorksInfo["process"] : null,
    },
    {
      name: "Mis Ordenes",
      to: "my-works",
      icon: CubeIcon,
      quantity: serviceWorksInfo ? serviceWorksInfo["myWorks"] : null,
    },
    {
      name: "Filtrar",
      to: "filter",
      icon: DocumentMagnifyingGlassIcon,
      quantity: false,
    },
  ];

  return (
    <>
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
            {link.quantity !== false ? (
              link.quantity === null ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <span className="bg-info px-2 py-1 rounded">
                  {link.quantity}
                </span>
              )
            ) : (
              <></>
            )}
          </NavLink>
        );
      })}
      {validateCreateServiceWork(user) && (
        <NavLink
          className="navLink flex-fill p-2 d-flex align-items-center gap-2 flex-row justify-content-center"
          to="/servicework/create"
        >
          <PlusCircleIcon className="icon" />
        </NavLink>
      )}
    </>
  );
}
