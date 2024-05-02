import ServiceWork from "../ServiceWork";

export default function Printers() {
  const url = `http://${import.meta.env.VITE_URL_HOST}/api/orders/pending/imp`;

  return <ServiceWork url={url} />;
}
