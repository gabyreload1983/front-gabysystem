import ServiceWOrkList from "../ServiceWOrkList";

export default function Pc() {
  const url = `http://${import.meta.env.VITE_URL_HOST}/api/orders/pending/pc`;

  return <ServiceWOrkList url={url} />;
}
