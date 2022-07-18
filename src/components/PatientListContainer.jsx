import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "../context/AccountContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

import "../css/PatientListContainer.css";

const PatientListContainer = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
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

  const removePatient = async (id) => {
    try {
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
          <Row as="form">
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

        {patients.map((patient, index) => (
          <Row key={index} className="gap-1 justify-content-center patientRow">
            <Col xs={3} className="text-center">
              {patient.cuil}
            </Col>
            <Col xs={3} className="text-center">
              {patient.fullName}
            </Col>
            <Col xs={3} className="text-center">
              {patient.consultations}
            </Col>
            <Col xs={1} className="text-center">
              <Link to={`/editar/${patient.id}`}>
                <FaRegEdit className="btnEdit" />
              </Link>
            </Col>
            <Col xs={1} className="text-center">
              <BiTrash
                className="btnRemove"
                onClick={() => removePatient(patient.id)}
              />
            </Col>
          </Row>
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
