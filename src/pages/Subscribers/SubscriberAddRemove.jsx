import { useState } from "react";
import Search from "../../components/Search";
import {
  addSubscriber,
  getCustomersByDescription,
  removeSubscriber,
} from "../../utils/data";
import { isSubscriber } from "../../utils/tools";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { SwalQuestion } from "../../utils/alerts";

export default function SubscriberAddRemove() {
  const [customers, setCustomers] = useState([]);

  const onSearch = async (description) => {
    const response = await getCustomersByDescription(description);
    setCustomers(response);
  };

  const onClean = () => {
    setCustomers([]);
  };

  const handleAdd = async (customer) => {
    const confirm = await SwalQuestion(
      `Agregar a ${customer.nombre} como ABONADO???`
    );
    if (!confirm) return;
    addSubscriber();
  };

  const handleRemove = async (customer) => {
    const confirm = await SwalQuestion(
      `QUITAR a ${customer.nombre} como ABONADO???`
    );
    if (!confirm) return;
    removeSubscriber();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-4 mt-5 mb-2">
          <Search
            onSearch={onSearch}
            onClean={onClean}
            searchDescription="Cliente"
          />
        </div>
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-hover table-dark bg-dark">
              <thead>
                <tr className="table-success">
                  <th scope="col">CODIGO</th>
                  <th scope="col">DESCRIPCION</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">DIRECCION</th>
                  <th scope="col">TELEFONO</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {customers?.length > 0 &&
                  customers.map((customer) => (
                    <tr key={customer.codigo}>
                      <td>{customer.codigo}</td>
                      <td>{customer.nombre}</td>
                      <td>{customer.mail}</td>
                      <td>{customer.direccion}</td>
                      <td>{customer.telefono}</td>
                      <td>
                        {isSubscriber(customer) ? (
                          <MinusCircleIcon
                            fill="red"
                            className="icon cursor-pointer"
                            onClick={() => handleRemove(customer)}
                          />
                        ) : (
                          <PlusCircleIcon
                            fill="green"
                            className="icon cursor-pointer"
                            onClick={() => handleAdd(customer)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
