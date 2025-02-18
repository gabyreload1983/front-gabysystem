import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSubscribers } from "../../../utils/data";

export default function SubscriberList() {
  const [subscribers, setSubscribers] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getSubscribers();
    setSubscribers(data);
  };

  const handleCustomerSelected = async (subscriber) => {
    navigate(`/subscribers/detail/${subscriber.code}`);
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
            <th scope="col">SERVIDORES</th>
          </tr>
        </thead>
        <tbody>
          {subscribers?.length > 0 &&
            subscribers.map((subscriber, index) => (
              <tr
                key={subscriber.code}
                onClick={() => handleCustomerSelected(subscriber)}
                className="cursor-pointer"
              >
                <td># {index + 1}</td>
                <td>{subscriber.code}</td>
                <td>{subscriber.name}</td>
                <td>{subscriber.email}</td>
                <td>{subscriber.address}</td>
                <td>{subscriber.phone}</td>
                <td>{subscriber.totalEquipments}</td>
                <td>{subscriber.totalServers}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
