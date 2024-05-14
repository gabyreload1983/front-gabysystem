import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { SwalError, postToApi } from "../../utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { API_URL } from "../../constants";

export default function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
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
    setLoader(true);
    const response = await postToApi(`${API_URL}/api/users/login`, loginForm);
    setLoader(false);

    if (response.status === "error") {
      return await SwalError(response);
    }
    if (response.status === "success") {
      const { user, accessToken } = response.payload;

      loginUserContext(user, accessToken);
      navigate("/");

      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Login success",
        position: "top-end",
        timer: 700,
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
    <div className="container-fluid bg-secondary">
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-6 col-lg-4">
          <h1 className="text-center">GS</h1>
          <h2 className="text-center">LOGIN</h2>
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
              disabled={loader}
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
