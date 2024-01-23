import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { SwalError } from "../../utils";

export default function AccountDetail() {
  const { id } = useParams();
  const { logoutUserContext } = useContext(UserContext);
  const [item, setItem] = useState(null);

  const getItemDetail = async () => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_URL_HOST}/api/alexis/account/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response?.data?.payload) {
        const item = response.data.payload;
        setItem(item);
      }
    } catch (error) {
      console.log(error);
      SwalError(error);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  useEffect(() => {
    getItemDetail();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>AccountDetail </h2>
      {item && item.internalId}
    </>
  );
}
