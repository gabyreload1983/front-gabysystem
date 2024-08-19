import { useEffect, useState } from "react";
import CustomersList from "../Customers/CustomersList";
import { getSubscribers } from "../../utils/data";
import { useNavigate } from "react-router-dom";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState(null);
  const navigate = useNavigate();

  const handleSelected = (subscriber) => {
    navigate(`/subscribers/${subscriber.codigo}`);
  };

  const getData = async () => {
    const data = await getSubscribers();
    setSubscribers(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center py-3">
        ABONADOS
        <span className="ms-2 bg-info rounded-pill p-2">
          {subscribers?.length}
        </span>
      </h2>
      {subscribers && (
        <CustomersList
          customers={subscribers}
          onHandleCustomerSelected={handleSelected}
        />
      )}
    </div>
  );
}
