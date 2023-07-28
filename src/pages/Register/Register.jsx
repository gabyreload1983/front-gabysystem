import React, { useState } from "react";
import { SwalError, SwalSuccess, postToApi } from "../../utils";

export default function Register() {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    code_technical: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const register = async () => {
    const response = await postToApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/users/register`,
      newUser
    );

    if (response.status === "error" && response.message === "jwt-expired") {
      await SwalError(response);
      logoutUserContext();
      return navigate("/login");
    }
    if (response.status === "error") return await SwalError(response);

    if (response.status === "success") {
      const form = document.querySelector("#formRegister");
      form.reset();
      setNewUser({
        first_name: "",
        last_name: "",
        email: "",
        code_technical: "",
        password: "",
      });
      SwalSuccess("User register!");
    }
  };
  return (
    <div className="row my-3 justify-content-center">
      <div className="col-12 col-md-6 col-lg-4">
        <form id="formRegister">
          <div className="form-floating mb-3">
            <input
              className="form-control form-control-sm"
              id="first_name"
              onChange={handleChange}
              type="text"
              placeholder="Nombre"
              name="first_name"
              required
            />
            <label htmlFor="first_name">Nombre</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control form-control-sm"
              id="last_name"
              onChange={handleChange}
              type="text"
              placeholder="Apellido"
              name="last_name"
              required
            />
            <label htmlFor="last_name">Apellido</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control form-control-sm"
              id="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control form-control-sm"
              id="code_technical"
              onChange={handleChange}
              type="text"
              placeholder="Usuario Urbano"
              name="code_technical"
              required
            />
            <label htmlFor="code_technical">Usuario Urbano</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control form-control-sm"
              id="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <select
            name="role"
            onChange={handleChange}
            required
            className="form-select form-select-sm mb-3"
          >
            <option value="">Role</option>
            <option value="technical">Tecnico</option>
            <option value="saler">Vendedor</option>
            <option value="premium">Premium</option>
          </select>

          <button className="btn btn-primary" onClick={register}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
