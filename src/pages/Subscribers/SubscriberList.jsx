import { useNavigate } from "react-router-dom";
import { getSubscribers } from "../../utils/data";
import { useEffect, useState } from "react";

export default function SubscriberList() {
  const [subscribers, setSubscribers] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getSubscribers();
    setSubscribers(data);
  };

  const handleCustomerSelected = async (subscriber) => {
    navigate(`/subscribers/detail/${subscriber.codigo}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-hover table-dark bg-dark">
        <thead>
          <tr className="table-success">
            <th scope="col">
              <span className="bg-info rounded-pill p-2">
                {subscribers?.length}
              </span>
            </th>
            <th scope="col">CODIGO</th>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">EMAIL</th>
            <th scope="col">DIRECCION</th>
            <th scope="col">TELEFONO</th>
            <th scope="col">EQUIPOS</th>
          </tr>
        </thead>
        <tbody>
          {subscribers?.length > 0 &&
            subscribers.map((subscriber, index) => (
              <tr
                key={subscriber.codigo}
                onClick={() => handleCustomerSelected(subscriber)}
                className="cursor-pointer"
              >
                <td># {index + 1}</td>
                <td>{subscriber.codigo}</td>
                <td>{subscriber.nombre}</td>
                <td>{subscriber.mail}</td>
                <td>{subscriber.direccion}</td>
                <td>{subscriber.telefono}</td>
                <td>{10}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
