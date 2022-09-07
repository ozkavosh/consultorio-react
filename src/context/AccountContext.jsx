import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AccountContext = createContext();

const useAccount = () => {
  return useContext(AccountContext);
};

const AccountContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, [auth]);

  return (
    <AccountContext.Provider
      value={{ currentUser, patients, setPatients }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { useAccount, AccountContextProvider };
