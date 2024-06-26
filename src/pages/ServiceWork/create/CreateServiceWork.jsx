import { useContext, useState } from "react";
import SearchCustomers from "../../../components/Customers/SearchCustomers";
import { UserContext } from "../../../context/userContext";
import FormCreateServiceWork from "./FormCreateServiceWork";
import { serviceWorkTemplate } from "../../../constants";

export default function CreateServiceWork() {
  const { user } = useContext(UserContext);
  const [customer, setCustomers] = useState(null);

  const [serviceWork, setServiceWork] = useState(serviceWorkTemplate);

  const handleCustomerSelected = (customer) => {
    setCustomers(customer);
    setServiceWork((prev) => ({
      ...prev,
      codigo: customer.codigo,
      nombre: customer.nombre,
      telefono: customer.telefono,
      mail: customer.mail,
      operador: user.code_technical,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newServiceWork = { ...serviceWork };
    for (const [key, value] of form) {
      newServiceWork[key] = value;
    }
    setServiceWork(newServiceWork);
    console.log(newServiceWork);
  };

  const clean = () => {
    setCustomers(null);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 mx-auto">
          {customer ? (
            <>
              <FormCreateServiceWork
                customer={customer}
                onHandleSubmit={handleSubmit}
              />
              <button className="btn btn-warning mt-2" onClick={clean}>
                Limpiar
              </button>
            </>
          ) : (
            <SearchCustomers
              onHandleCustomerSelected={handleCustomerSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}
