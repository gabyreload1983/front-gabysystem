import ServiceWOrkList from "../ServiceWOrkList";

export default function Process() {
  const url = `http://${import.meta.env.VITE_URL_HOST}/api/orders/in-process`;

  return <ServiceWOrkList url={url} />;
}
