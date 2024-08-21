import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomer, getCustomerServiceWorks } from "../../utils/data";
import { getOrderState, getOrderUbication } from "../../utils/tools";

export default function CustomerOrdersList() {
  const [serviceWorks, setServiceWork] = useState([]);
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    const response = await getCustomerServiceWorks({ code: id });
    if (!response) return;
    setServiceWork(response);
    const responseCustomer = await getCustomer({ code: id });
    if (!response) return;
    setCustomer(responseCustomer);
  };

  const handleClick = ({ nrocompro }) => {
    navigate(`/servicework/detail/${nrocompro}`);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="row p-2">
      <div className="col text-center text-white">
        <h2>Historial Ordenes</h2>
        <h3>
          {customer?.codigo} - {customer?.nombre}
        </h3>
      </div>
      <table className="table table-dark table-sm bg-dark table-hover">
        <thead>
          <tr className="table-success">
            <th scope="col" className="d-none d-md-table-cell">
              FECHA
            </th>
            <th scope="col">NRO</th>
            <th scope="col">PRODUCTO</th>
            <th scope="col" className="d-none d-md-table-cell">
              ESTADO
            </th>
            <th scope="col" className="d-none d-md-table-cell">
              UBICACION
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceWorks.length > 0 &&
            serviceWorks.map((serviceWork) => (
              <tr
                key={serviceWork.nrocompro}
                className="cursor-pointer"
                onClick={() =>
                  handleClick({ nrocompro: serviceWork.nrocompro })
                }
              >
                <td className="d-none d-md-table-cell">
                  {" "}
                  {moment(serviceWork.ingresado).format("DD/MM/YYYY hh:mm a")}
                </td>
                <td>{serviceWork.nrocompro}</td>
                <td>{serviceWork.descart}</td>
                <td className="d-none d-md-table-cell">
                  {getOrderState(serviceWork.estado)}
                </td>
                <td className="d-none d-md-table-cell">
                  {getOrderUbication(serviceWork.ubicacion)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
