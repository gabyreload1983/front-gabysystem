import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
