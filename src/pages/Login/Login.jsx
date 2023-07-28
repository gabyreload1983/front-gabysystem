import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { SwalError, postToApi } from "../../utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { loginUserContext } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) login();
  };

  const login = async () => {
    setIsLogin(true);
    const response = await postToApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/users/login`,
      loginForm
    );

    if (response.status === "error") {
      setIsLogin(false);
      return await SwalError(response);
    }
    if (response.status === "success") {
      const { user, accessToken } = response;

      loginUserContext(user, accessToken);

      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Login success",
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        didClose: () => {
          navigate("/");
        },
      });
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-6 col-lg-4">
          <h1 className="text-center">LOGIN</h1>
          <form onKeyDown={handleKeyDown}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="email"
                onChange={handleChange}
                type="email"
                placeholder="Email"
                name="email"
              />
              <label htmlFor="email">Email </label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
                name="password"
              />
              <label htmlFor="password">Password </label>
            </div>

            <button
              onClick={login}
              disabled={isLogin}
              className="btn btn-primary"
            >
              {isLogin ? "Wait..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
