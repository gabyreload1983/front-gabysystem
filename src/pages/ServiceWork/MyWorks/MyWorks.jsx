import { useContext } from "react";
import ServiceWork from "../ServiceWork";
import { UserContext } from "../../../context/userContext";
import { API_URL } from "../../../constants";

export default function MyWorks() {
  const { user } = useContext(UserContext);
  const url = `${API_URL}/api/orders/technical/${user.code_technical}`;

  return <ServiceWork url={url} />;
}
