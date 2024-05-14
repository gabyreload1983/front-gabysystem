import { API_URL } from "../../../constants";
import ServiceWork from "../ServiceWork";

export default function Process() {
  const url = `${API_URL}/api/orders/in-process`;

  return <ServiceWork url={url} />;
}
