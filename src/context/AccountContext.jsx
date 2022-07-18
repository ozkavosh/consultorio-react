import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

const useAccount = () => {
  return useContext(AccountContext);
};

const AccountContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <AccountContext.Provider value={{ token, setToken }}>
      {children}
    </AccountContext.Provider>
  );
};

export {
  useAccount,
  AccountContextProvider,
};
