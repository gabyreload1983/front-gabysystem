import Form from "../../../components/Form/Form";
import { AddNewReplacement } from "../../../utils/data";

export default function AddReplacement() {
  const inputs = [
    { name: "orden", code: "orderNumber", required: false },
    { name: "tecnico", code: "technical_code", required: true },
    { name: "descripcion", code: "description", required: true },
    { name: "proveedor", code: "supplier", required: false },
    { name: "costo", code: "cost", required: false },
    { name: "demora", code: "delay", required: false },
    { name: "envio", code: "shipmment", required: false },
    { name: "link", code: "linkSupplier", required: false },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newReplacement = {};
    for (const [key, value] of form) {
      newReplacement[key] = value;
    }

    const res = await AddNewReplacement(newReplacement);
    console.log(res);
  };

  return (
    <div className="container">
      <h2>Form AddReplacement</h2>
      <Form inputs={inputs} onHandleSubmit={handleSubmit} />
    </div>
  );
}
