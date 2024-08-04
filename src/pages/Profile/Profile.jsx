import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { getJWT } from "../../utils";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../constants";
import { SwalError, SwalSuccess, SwalWaiting } from "../../utils/alerts";
import { capitalize, isValidUrl } from "../../utils/tools";

export default function Profile() {
  const { user, updateUserContext } = useContext(UserContext);

  const handleUpdateImageUrl = async () => {
    try {
      const { value: imageUrl } = await Swal.fire({
        title: "Ingrese URL de imagen de perfil",
        input: "text",
        inputLabel: "URL",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Ingrese URL de imagen de perfil";
          }
        },
      });
      if (imageUrl) {
        SwalWaiting("Actualizando perfil...");

        if (!isValidUrl(imageUrl)) return SwalError("URL invalida!");

        const userUpdate = { imageUrl };
        const res = await axios.put(
          `${API_URL}/api/users/${user._id}`,
          { userUpdate },
          {
            headers: {
              Authorization: `Bearer ${getJWT()}`,
            },
          }
        );

        if (res?.data.status === "success") {
          updateUserContext(res.data.payload);
          return SwalSuccess(res.data.message);
        }
      }
    } catch (error) {
      SwalError(error.message);
    }
  };

  return (
    <div className="container">
      {user && (
        <div
          className="row border border-3 border-success p-4 rounded-5 mt-3 justify-content-center align-items-center bg-dark text-white"
          style={{ maxWidth: 600 }}
        >
          <div className="col d-flex flex-column justify-content-center align-items-center">
            {user?.imageUrl ? (
              <img className="img-profile" src={user.imageUrl} alt="" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  className="pointer"
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            )}
            <svg
              onClick={handleUpdateImageUrl}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil mt-3 cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </div>
          <div className="col d-flex flex-column">
            <p className="border-bottom border-2">
              NOMBRE: {capitalize(user.first_name)}
            </p>
            <p className="border-bottom border-2">
              APELLIDO: {capitalize(user.last_name)}
            </p>
            <p className="border-bottom border-2">EMAIL: {user.email}</p>
            <p className="border-bottom border-2">
              CODIGO URBANO: {user.code_technical}
            </p>
            <p className="border-bottom border-2">
              ROL: {capitalize(user.role)}
            </p>
            <p className="border-bottom border-2">
              API: Version {user.api_version}
            </p>
            <p className="border-bottom border-2">
              GS: Version {process.env.PACKAGE_VERSION}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
