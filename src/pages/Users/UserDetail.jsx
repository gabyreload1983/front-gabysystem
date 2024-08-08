import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { API_URL } from "../../constants";
import { SwalError, SwalQuestion } from "../../utils/alerts";
import { getFromApi, putToApi } from "../../utils/api";
import { getJWT } from "../../utils/tools";

export default function UserDetail() {
  const { id } = useParams();
  const [userUpdate, setUserUpdate] = useState(null);
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const getUser = async () => {
    try {
      const response = await getFromApi(`${API_URL}/api/users/${id}`);

      if (response.status === "success") return setUserUpdate(response.payload);
    } catch (error) {
      SwalError(error?.message);
    }
  };
  useEffect(() => {
    getUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserUpdate((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const update = async () => {
    const response = await putToApi(`${API_URL}/api/users/${id}`, {
      userUpdate,
    });

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

  const remove = async (user) => {
    try {
      const confirm = await SwalQuestion(
        `Borrar usuario ${user.first_name} ${user.last_name}???`
      );
      if (!confirm) return;

      const { data } = await axios.delete(
        `${API_URL}/api/users/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        }
      );

      if (data.status === "success") {
        await Swal.fire({
          toast: true,
          icon: "success",
          text: data.message,
          position: "top-end",
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        navigate("/users");
      }
    } catch (error) {
      SwalError(error?.message);
    }
  };

  return (
    <div className="row my-3">
      <div className="col-12 col-md-6 col-lg-4">
        {userUpdate?.imageUrl ? (
          <img className="img-fluid" src={userUpdate.imageUrl} alt="" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
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
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        {userUpdate && (
          <>
            <div className="form-floating mb-3">
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                type="text"
                placeholder="Nombre"
                name="first_name"
                required
                value={userUpdate.first_name}
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
                value={userUpdate.last_name}
              />
              <label htmlFor="last_name">Apellido</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                type="text"
                placeholder="Email"
                name="email"
                required
                value={userUpdate.email}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                type="text"
                placeholder="Usuario Urbano"
                name="code_technical"
                required
                value={userUpdate.code_technical}
              />
              <label htmlFor="code_technical">Usuario Urbano</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                type="text"
                name="imageUrl"
                required
                value={userUpdate.imageUrl}
              />
              <label htmlFor="code_technical">URL imagen Perfil</label>
            </div>

            <div className="form-floating">
              <select
                name="role"
                className="form-select form-select-sm mb-3"
                onChange={handleChange}
              >
                <option value={userUpdate.role}>{userUpdate.role}</option>
                <option value="technical">Tecnico</option>
                <option value="seller">Vendedor</option>
                <option value="premium">Premium</option>
                <option value="user">User</option>
              </select>
              <label htmlFor="role">Role</label>
            </div>

            <div className="div d-flex justify-content-between">
              <button className="btn btn-primary" onClick={update}>
                Update
              </button>

              <button
                className="btn btn-danger ms-5"
                onClick={() => remove(userUpdate)}
              >
                Remove
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
