import { useParams } from "react-router-dom";
import { getCustomer } from "../../utils/data";
import { useEffect, useState } from "react";

export default function SubscriberDetail() {
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);

  const getData = async () => {
    const data = await getCustomer({ code: id });
    setSubscriber(data[0]);
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
          <p>Equipos:</p>
          <p>Servidores:</p>
        </div>
      )}
    </div>
  );
}
