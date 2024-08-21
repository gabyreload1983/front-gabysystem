import { useParams } from "react-router-dom";
import { getCustomer } from "../../utils/data";
import { useEffect, useState } from "react";
import { isSubscriber } from "../../utils/tools";

export default function SubscriberDetail() {
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);

  const getData = async () => {
    const data = await getCustomer({ code: id });
    if (!isSubscriber(data)) return;
    setSubscriber(data);
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
        </div>
      )}
    </div>
  );
}
