import React, { useEffect, useState } from "react";
import { SwalError, getFromApi, validateStatus } from "../../utils";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

export default function Users() {
  const [users, setusers, logoutUserContext] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = await getFromApi(`${API_URL}/api/users`);

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
                <th scope="col"></th>
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
                        {" "}
                        {user?.imageUrl ? (
                          <img
                            className="img-profile-thumb"
                            src={user.imageUrl}
                            alt="image profile"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill="currentColor"
                            color="black"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                              fillRule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                          </svg>
                        )}
                      </th>
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
