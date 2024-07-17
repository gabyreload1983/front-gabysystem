import React, { useContext } from "react";
import SideBarCommon from "./SideBarCommon";
import SideBarPremium from "./SideBarPremium";
import { UserContext } from "../../context/userContext";
import SideBarAdmin from "./SideBarAdmin";
import { validateUserRole } from "../../utils/validation";

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
