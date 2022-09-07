import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useAccount } from "../context/AccountContext";
import PrescriptionModal from "./PrescriptionModal";
import Patient from "./Patient";

import "../css/PatientListContainer.css";

const PatientListContainer = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [patient, setPatient] = useState({ monthlyPrescriptions: [] });
  const [show, setShow] = useState(false);
  const { currentUser, patients, setPatients } = useAccount();

  useEffect(() => {
    const db = getFirestore();
    onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setPatients(doc.data().patients);
    });
  }, [currentUser.uid, setPatients]);

  const prescriptionList = (cuil) => {
    setPatient(patients.find((p) => p.cuil === cuil));
    setShow(true);
  };

  const removePatient = async (cuil, name) => {
    const db = getFirestore();
    try {
      const result = await Swal.fire({
        title: "Confimar usuario",
        text: `¿Esta seguro de eliminar el paciente ${name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isDismissed) return;

      await updateDoc(doc(db, "users", currentUser.uid), {
        patients: patients.filter((p) => p.cuil !== cuil),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchPatients = (e) => {
    e.preventDefault();
    const search = e.target.search.value.toLowerCase();
    const filter = patients.filter(
      (patient) =>
        patient.cuil.includes(search) ||
        patient.name.toLowerCase().includes(search)
    );
    if (!filter.length)
      return Swal.fire(
        "Sin resultados",
        "Su busqueda no devolvió resultados",
        "error"
      );
    setSearchResult(filter);
  };

  return (
    <Container className="patientListContainer">
      <Row>
        <Col xs={12}>
          <h2>Lista de pacientes</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <h3>Buscar</h3>
        </Col>
        <Col xs={12}>
          <Row as="form" onSubmit={searchPatients}>
            <Col xs={5}>
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Nombre, apellido o CUIL"
              />
            </Col>
            <Col xs={3}>
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="gap-1">
        <Row className="text-light gap-1 justify-content-center">
          <Col xs={3} className="bg-dark text-center">
            Cuil
          </Col>
          <Col xs={3} className="bg-dark text-center">
            Nombre
          </Col>
          <Col xs={2} className="bg-dark text-center">
            Consultas
          </Col>
          <Col xs={1} className="bg-dark text-center">
            Editar
          </Col>
          <Col xs={1} className="bg-dark text-center">
            Eliminar
          </Col>
        </Row>

        {searchResult.length
          ? searchResult.map((patient, index) => (
              <Patient
                patient={patient}
                index={index}
                removePatient={removePatient}
                prescriptionList={prescriptionList}
              />
            ))
          : patients.map((patient, index) => (
              <Patient
                key={index}
                patient={patient}
                removePatient={removePatient}
                prescriptionList={prescriptionList}
              />
            ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <Link to="/agregar">
            <Button> Agregar Nuevo </Button>
          </Link>
        </Col>
      </Row>

      <PrescriptionModal show={show} setShow={setShow} patient={patient}/>
    </Container>
  );
};

export default PatientListContainer;