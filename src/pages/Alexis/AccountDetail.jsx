import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { SwalWaiting, formatPrice, getJWT } from "../../utils";
import moment from "moment";
import Swal from "sweetalert2";
import { API_URL } from "../../constants";
import { SwalError, SwalToast } from "../../utils/alerts";

export default function AccountDetail() {
  const { id } = useParams();
  const { logoutUserContext } = useContext(UserContext);
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  const getItemDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/alexis/account/${id}`, {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      });

      if (response?.data?.payload) {
        const item = response.data.payload;
        setItem(item);
      }
    } catch (error) {
      SwalError(error?.message);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  useEffect(() => {
    getItemDetail();
  }, [id]);

  const removeItem = async () => {
    const answer = await Swal.fire({
      text: `Borrar item???`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    });

    if (!answer.isConfirmed) return;

    SwalWaiting("Wait...");

    try {
      const response = await axios.delete(
        `${API_URL}/api/alexis/account/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        }
      );

      if (response?.data?.status === "success") {
        SwalToast(response.data.message);
        return navigate("/alexis/account");
      }
      SwalToast("Algo salio mal. Contactar al administrador");
    } catch (error) {
      SwalError(error?.message);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  return (
    <>
      <h2 className="text-center">DETALLE</h2>
      {item && (
        <div className="row gap-2 justify-content-center">
          <div className="col-12 col-md-6 col-lg-3 p-3 border rounded-3 bg-light">
            <p>FECHA: {moment(item.createdAt).format("DD-MM-YYYY")}</p>
            <p>COMPROBANTE: {item.internalId}</p>
            <p>IMPORTE: ${formatPrice(item.value)}</p>
            <div className="row">
              <button className="btn btn-outline-danger" onClick={removeItem}>
                x
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
