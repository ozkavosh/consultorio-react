import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountContextProvider } from "./context/AccountContext";
import Login from "./components/Login";
import PatientListContainer from "./components/PatientListContainer";
import AddPatient from "./components/AddPatient";
import EditPatient from "./components/EditPatient";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./css/bootstrap.min.css";

function App() {
  return (
    <AccountContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/listado" element={<PatientListContainer />} />
          <Route path="/agregar" element={<AddPatient/>}></Route>
          <Route path="/editar/:id" element={<EditPatient/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AccountContextProvider>
  );
}

export default App;
