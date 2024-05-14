import { API_URL } from "../../../constants";
import ServiceWork from "../ServiceWork";

export default function Pc() {
  const url = `${API_URL}/api/orders/pending/pc`;

  return <ServiceWork url={url} />;
}
