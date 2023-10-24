import React, { useEffect, useState } from "react";
import { SwalError, getFromApi, validateStatus } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setusers, logoutUserContext] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = await getFromApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/users`
      );

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") return setusers(response.payload);
    } catch (error) {
      SwalError(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const editUser = async (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Users</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Codigo Urbano</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 &&
                users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <th>
                        {user.first_name} {user.last_name}
                      </th>
                      <th>{user.email}</th>
                      <th>{user.code_technical}</th>
                      <th>{user.role}</th>
                      <th>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => editUser(user._id)}
                        >
                          edit
                        </button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
