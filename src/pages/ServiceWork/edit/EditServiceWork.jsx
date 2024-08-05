import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormEditServiceWork from "./FormEditServiceWork";
import ServiceWorkUpdateDto from "../../../DTO/ServiceWork.dto";
import { SwalSuccess } from "../../../utils/alerts";
import { getServiceWork, updateServiceWork } from "../../../utils/data";

export default function EditServiceWork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceWork, setServiceWork] = useState(null);

  const getData = async () => {
    const data = await getServiceWork({ nrocompro: id });
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
          nrocompro={id}
          serviceWork={serviceWork}
          onHandleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
