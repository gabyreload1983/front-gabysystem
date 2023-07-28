import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Login from "../Login/Login";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="container">
      {user ? (
        <h1>
          Bienvenido{" "}
          <strong>
            {user?.first_name} {user?.last_name}
          </strong>
        </h1>
      ) : (
        <Login />
      )}
    </div>
  );
}
