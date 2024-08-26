import { useNavigate, useParams } from "react-router-dom";
import { getCustomer, removeSubscriber } from "../../utils/data";
import { useContext, useEffect, useState } from "react";
import { isSubscriber } from "../../utils/tools";
import { SwalActionConfirmWithText, SwalToast } from "../../utils/alerts";
import { UserContext } from "../../context/userContext";
import { validateUserRole } from "../../utils/validation";

export default function SubscriberDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getCustomer({ code: id });
    if (!isSubscriber(data)) return;
    setSubscriber(data);
  };

  const handleRemove = async (subscriber) => {
    const confirm = await SwalActionConfirmWithText(
      subscriber.codigo,
      "Esta seguro de quitar el abono???",
      "Ingrese el codigo de cliente para confirmar"
    );

    if (!confirm) return;

    const response = await removeSubscriber(subscriber.codigo);
    if (response?.status === "success") {
      await SwalToast("Se quito abondo!", 500);
      navigate("/subscribers/list");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {subscriber && (
        <div className="row bg-dark text-white mt-2">
          <h2 className="text-center">
            {subscriber.codigo} - {subscriber.nombre}
          </h2>
          <p>Servidores: 2</p>
          <p>Equipos: 10</p>
          <div className="col-12 my-3 text-end">
            {validateUserRole(user, "premium") && (
              <button
                onClick={() => handleRemove(subscriber)}
                className="btn btn-danger"
              >
                QUITAR
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
