import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SwalError, getFromApi, putToApi } from "../../utils";
import Swal from "sweetalert2";
import { UserContext } from "../../context/userContext";

export default function UserDetail() {
  const { id } = useParams();
  const [updateUser, setUpdateUser] = useState(null);
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const getUser = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/users/${id}`
    );

    if (response.status === "error" && response.message === "jwt-expired") {
      await SwalError(response);
      logoutUserContext();
      return navigate("/login");
    }
    if (response.status === "error") return await SwalError(response);

    if (response.status === "success") return setUpdateUser(response.user);
  };
  useEffect(() => {
    getUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const update = async () => {
    const response = await putToApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/users/${id}`,
      updateUser
    );

    if (response.status === "error" && response.message === "jwt-expired") {
      await SwalError(response);
      logoutUserContext();
      return navigate("/login");
    }
    if (response.status === "error") return await SwalError(response);

    if (response.status === "success") {
      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Update user success",
        position: "top-end",
        timer: 1000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }
  };

  return (
    <div className="container">
      <div className="row my-3 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          {updateUser && (
            <form id="formRegister">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  type="text"
                  placeholder="Nombre"
                  name="first_name"
                  required
                  value={updateUser.first_name}
                />
                <label htmlFor="first_name">Nombre</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  type="text"
                  placeholder="Apellido"
                  name="last_name"
                  required
                  value={updateUser.last_name}
                />
                <label htmlFor="first_name">Apellido</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  type="text"
                  placeholder="Email"
                  name="email"
                  required
                  value={updateUser.email}
                />
                <label htmlFor="first_name">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  type="text"
                  placeholder="Usuario Urbano"
                  name="code_technical"
                  required
                  value={updateUser.code_technical}
                />
                <label htmlFor="first_name">Usuario Urbano</label>
              </div>

              <select
                name="role"
                className="form-select form-select-sm mb-3"
                onChange={handleChange}
                required
              >
                <option value="">Actualizar Rol</option>
                <option value="technical">Tecnico</option>
                <option value="saler">Vendedor</option>
                <option value="premium">Premium</option>
              </select>

              <button className="btn btn-primary" onClick={update}>
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
