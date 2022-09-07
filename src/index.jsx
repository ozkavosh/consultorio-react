import React from "react";
import ReactDOM from "react-dom/client";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import App from "./App";
import { getFirebaseApp } from "./firebase/config";
import { AccountContextProvider } from "./context/AccountContext";

const app = getFirebaseApp();
getAuth(app);
getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AccountContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AccountContextProvider>
);
