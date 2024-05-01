import ServiceWOrkList from "../ServiceWOrkList";

export default function Printers() {
  const url = `http://${import.meta.env.VITE_URL_HOST}/api/orders/pending/imp`;

  return <ServiceWOrkList url={url} />;
}
