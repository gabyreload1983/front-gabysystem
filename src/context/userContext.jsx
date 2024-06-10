import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getJWT } from "../utils";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logoutUserContext = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
  };

  const loginUserContext = (token) => {
    localStorage.setItem("jwtToken", token);
    const { user } = jwtDecode(token);
    setUser(user);
  };

  const updateUserContext = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{ user, loginUserContext, logoutUserContext, updateUserContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
