import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PatientListContainer from "./components/PatientListContainer";
import AddPatient from "./components/AddPatient";
import EditPatient from "./components/EditPatient";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./css/bootstrap.min.css";
import "./css/App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/listado" element={<ProtectedRoute><PatientListContainer /></ProtectedRoute>} />
          <Route path="/agregar" element={<ProtectedRoute><AddPatient/></ProtectedRoute>}></Route>
          <Route path="/editar/:id" element={<ProtectedRoute><EditPatient/></ProtectedRoute>}></Route>
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
