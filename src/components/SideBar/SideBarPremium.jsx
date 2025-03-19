import { NavLink } from "react-router-dom";
import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  NewspaperIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { WrenchIcon } from "@heroicons/react/24/solid";

export default function SideBarPremium() {
  const links = [
    {
      name: "Estadisticas",
      to: "statistics",
      icon: ChartBarIcon,
    },

    {
      name: "Alexis",
      to: "alexis",
      icon: NewspaperIcon,
    },
    {
      name: "Cuentas Corrientes",
      to: "summaries",
      icon: CurrencyDollarIcon,
    },
    ,
    {
      name: "RMA",
      to: "rma",
      icon: WrenchIcon,
    },
    {
      name: "Repuestos",
      to: "replacements/list",
      icon: WrenchScrewdriverIcon,
    },
    {
      name: "Control Stock",
      to: "stock-control",
      icon: ClipboardDocumentCheckIcon,
    },
  ];

  return (
    <div className="d-flex flex-row text-white flex-xl-column bg-dark m-2 rounded-2">
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
  );
}
