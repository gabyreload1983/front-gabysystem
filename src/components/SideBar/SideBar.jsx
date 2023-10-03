import React, { useContext } from "react";
import SideBarCommon from "./SideBarCommon";
import SideBarPremium from "./SideBarPremium";
import { validateUserRole } from "../../utils";
import { UserContext } from "../../context/userContext";
import SideBarAdmin from "./SideBarAdmin";

export default function SideBar() {
  const { user } = useContext(UserContext);

  return (
    <>
      {!validateUserRole(user, "admin") && <SideBarCommon />}
      {validateUserRole(user, "premium") && <SideBarPremium />}
      {validateUserRole(user, "admin") && <SideBarAdmin />}
    </>
  );
}
