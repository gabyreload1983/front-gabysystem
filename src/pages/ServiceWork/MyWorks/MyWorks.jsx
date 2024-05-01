import { useContext } from "react";
import ServiceWOrkList from "../ServiceWOrkList";
import { UserContext } from "../../../context/userContext";

export default function MyWorks() {
  const { user } = useContext(UserContext);
  const url = `http://${import.meta.env.VITE_URL_HOST}/api/orders/technical/${
    user.code_technical
  }`;

  return <ServiceWOrkList url={url} />;
}
