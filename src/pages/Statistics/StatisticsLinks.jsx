import { NavLink } from "react-router-dom";
import { CubeIcon, UsersIcon } from "@heroicons/react/16/solid";

export default function StatisticsLinks() {
  const links = [
    {
      name: "Reparaciones",
      to: "/statistics/repairs",
      icon: CubeIcon,
    },
    {
      name: "Tecnicos",
      to: "/statistics/technicals",
      icon: UsersIcon,
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
          </NavLink>
        );
      })}
    </>
  );
}
