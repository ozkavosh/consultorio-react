import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "../context/AccountContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import "../css/PatientListContainer.css";
import Patient from "./Patient";

const PatientListContainer = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const { token } = useAccount();

  useEffect(() => {
    (async () => {
      try {
        if (!token) return navigate("/");
        console.log("Se hizo una consulta en PLContainer");
        const response = await axios.get(
          "https://ch-simple-login.glitch.me/api/data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatients(response.data);
      } catch (err) {
        console.log("Se hizo una consulta en PLContainer");
        console.log(err.message);
      }
    })();
  }, [navigate, token]);

  const removePatient = async (id, name) => {
    try {
      const result = await Swal.fire({
        title: "Confimar usuario",
        text: `¿Esta seguro de eliminar el paciente ${name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      });

      if(result.isDismissed) return;

      const response = await axios.delete(
        `https://ch-simple-login.glitch.me/api/data/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPatients(response.data);
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
        patient.fullName.toLowerCase().includes(search)
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
          <Col xs={3} className="bg-dark text-center">
            Consultas del mes
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
              />
            ))
          : patients.map((patient, index) => (
              <Patient
                key={index}
                patient={patient}
                removePatient={removePatient}
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
    </Container>
  );
};

export default PatientListContainer;
