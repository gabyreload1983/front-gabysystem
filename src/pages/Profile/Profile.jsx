import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <div className="container">
      {user && (
        <div>
          <p>Nombre: {user.first_name}</p>
          <p>Apellido: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Codigo Urbano: {user.code_technical}</p>
          <p>Rol: {user.role}</p>
        </div>
      )}
    </div>
  );
}
