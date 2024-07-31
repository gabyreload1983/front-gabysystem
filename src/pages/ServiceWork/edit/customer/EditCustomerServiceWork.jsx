import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SwalToast } from "../../../../utils";
import ButtonPdf from "../../../../components/ServiceWork/ButtonPdf";
import Search from "../../../../components/Search";
import {
  getCustomersByDescription,
  updateServideWorkCustomer,
  getServiceWork,
} from "../../../../utils/data";
import CustomersList from "../../../Customers/CustomersList";

export default function EditCustomerServiceWork() {
  const { id } = useParams();
  const [serviceWork, setServiceWork] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null);

  const getData = async () => {
    const data = await getServiceWork({ nrocompro: id });
    setServiceWork(data);
  };

  const handleUpdateCustomer = async () => {
    if (!customer) return;

    const response = await updateServideWorkCustomer({
      nrocompro: serviceWork.nrocompro,
      customerId: customer.codigo,
    });

    if (!response) return;
    await getData();
    setCustomers([]);
    setCustomer(null);
    return SwalToast("Orden actualizada!!", 1000);
  };
  const handleCustomerSelected = (customer) => {
    setCustomer(customer);
    setServiceWork((prev) => ({
      ...prev,
      codigo: customer.codigo,
      nombre: customer.nombre,
    }));
  };

  const onSearch = async (description) => {
    const response = await getCustomersByDescription(description);
    setCustomers(response);
  };

  const onClean = async () => {
    setCustomers([]);
    await getData();
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container">
      {serviceWork && (
        <div className="row mt-3">
          <h2>Actualizar Cliente</h2>
          <div className="col-12 my-3 border border-success rounded p-2">
            <Link
              to={`/servicework/detail/${serviceWork.nrocompro}`}
              className="text-black"
            >
              <h3>{serviceWork.nrocompro}</h3>
            </Link>
            <h4>
              {serviceWork.codigo} - {serviceWork.nombre}
            </h4>
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={handleUpdateCustomer}
              >
                ACTUALIZAR
              </button>
              <div className="d-flex ms-auto gap-2">
                <ButtonPdf nrocompro={serviceWork.nrocompro} />
                <ButtonPdf nrocompro={serviceWork.nrocompro} customer={true} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-4 mt-5">
            <Search
              onSearch={onSearch}
              onClean={onClean}
              searchDescription="Cliente"
            />
          </div>
          <div className="col-12">
            <CustomersList
              customers={customers}
              onHandleCustomerSelected={handleCustomerSelected}
            />
          </div>
        </div>
      )}
    </div>
  );
}
