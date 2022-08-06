import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "../context/AccountContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../css/EditPatient.css";

const EditPatient = () => {
  const [patient, setPatient] = useState({});
  const navigate = useNavigate();
  const { token, verifyCuil } = useAccount();
  const { id } = useParams();
  const cuilRef = useRef();
  const fullNameRef = useRef();
  const consultationsRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const cuil = cuilRef.current;
        const fullName = fullNameRef.current;
        const consultations = consultationsRef.current;
        if (!token) return navigate("/");
        const response = await axios.get(
          `https://ch-simple-login.glitch.me/api/data/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPatient(response.data);
        cuil.value = response.data.cuil;
        fullName.value = response.data.fullName;
        consultations.value = response.data.consultations;
      } catch (err) {
        console.log(err);
      }
    })();
  }, [navigate, token, id]);

  const resetData = () => {
        const cuil = cuilRef.current;
        const fullName = fullNameRef.current;
        const consultations = consultationsRef.current;

        cuil.value = patient.cuil;
        fullName.value = patient.fullName;
        consultations.value = patient.consultations;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const { cuil, fullName, consultations } = e.target;

    if (cuil.value !== patient.cuil && verifyCuil(cuil.value))
      return Swal.fire("Error!", "El CUIL ingresado ya existe.", "error");
    if (!cuil.value || !fullName.value || !consultations.value)
      return Swal.fire("Error!", "No pueden quedar campos vacios.", "error");

    try {
      await axios.put(
        `https://ch-simple-login.glitch.me/api/data/${id}`,
        {
          cuil: cuil.value,
          fullName: fullName.value,
          consultations: consultations.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Se hizo una consulta en EPatient");

      navigate('/listado');

      Swal.fire("Exito!", "Paciente editado con éxito.", "success");
    } catch (err) {
      console.log("Se hizo una consulta en EPatient");
      console.log(err);
      Swal.fire("Error!", "No se pudo editar el paciente.", "error");
    }
  };

  return (
    <Container className="editPatient">
      <Row>
        <Col xs={12}>
          <h2>Editar Paciente</h2>
        </Col>

        <Col>
          <form onSubmit={submitHandler}>
            <label htmlFor="cuil" className="form-label">
              Nro. CUIL
            </label>
            <input ref={cuilRef} type="number" name="cuil" className="form-control"/>

            <label htmlFor="cuil" className="form-label">
              Nombre Completo
            </label>
            <input ref={fullNameRef} type="text" name="fullName" className="form-control" />

            <label htmlFor="cuil" className="form-label">
              Consultas del mes
            </label>
            <input
              ref={consultationsRef}
              type="number"
              name="consultations"
              className="form-control"
            />

            <Button type="submit" className="mt-3 me-2">
              Editar Paciente
            </Button>
            <Button onClick={resetData} className="mt-3">
              Restablecer Datos
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPatient;
