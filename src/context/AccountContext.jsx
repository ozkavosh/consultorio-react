import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

const useAccount = () => {
  return useContext(AccountContext);
};

const AccountContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [patients, setPatients] = useState([]);

  const verifyCuil = (cuil) => {
    return patients.some(patient => { console.log(cuil, patient.cuil); return patient.cuil === cuil});
  }

  return (
    <AccountContext.Provider value={{ token, patients, setToken, setPatients, verifyCuil }}>
      {children}
    </AccountContext.Provider>
  );
};

export { useAccount, AccountContextProvider };
