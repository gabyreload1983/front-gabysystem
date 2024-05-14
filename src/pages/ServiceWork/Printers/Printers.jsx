import { API_URL } from "../../../constants";
import ServiceWork from "../ServiceWork";

export default function Printers() {
  const url = `${API_URL}/api/orders/pending/imp`;

  return <ServiceWork url={url} />;
}
