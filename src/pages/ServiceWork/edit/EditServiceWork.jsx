import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SwalSuccess, getOrder, updateServiceWork } from "../../../utils";
import FormEditServiceWork from "./FormEditServiceWork";
import ServiceWorkUpdateDto from "../../../DTO/ServiceWork.dto";

export default function EditServiceWork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceWork, setServiceWork] = useState(null);

  const getData = async () => {
    const data = await getOrder({ id });
    setServiceWork(new ServiceWorkUpdateDto(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updatedServiceWork = { ...serviceWork };
    for (const [key, value] of form) {
      updatedServiceWork[key] = value;
    }

    setServiceWork(updatedServiceWork);

    const response = await updateServiceWork({ id, updatedServiceWork });
    if (response) {
      await SwalSuccess(`Orden ${id} actualizada exitosamente!`);
      navigate(`/servicework/detail/${id}`);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      {serviceWork && (
        <FormEditServiceWork
          serviceWork={serviceWork}
          onHandleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
