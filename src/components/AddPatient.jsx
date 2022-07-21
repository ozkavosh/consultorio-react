import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../context/AccountContext";
import { Button, Col, Container, Row } from "react-bootstrap";

const AddPatient = () => {
  const navigate = useNavigate();
  const { token } = useAccount();

  useEffect(() => {
    if (!token) return navigate("/");
  }, [navigate, token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { cuil, fullName, consultations } = e.target;
    if (!cuil.value || !fullName.value || !consultations.value)
      return Swal.fire("Error!", "No pueden quedar campos vacios.", "error");

    try {
      await axios.post(
        "https://ch-simple-login.glitch.me/api/data",
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

      console.log("Se hizo una consulta en APatient");

      Swal.fire("Exito!", "Paciente cargado con éxito.", "success");
    } catch (err) {
      console.log("Se hizo una consulta en APatient");
      console.log(err);
      Swal.fire("Error!", "No se pudo cargar al paciente.", "error");
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h2>Agregar Nuevo Paciente</h2>
        </Col>

        <Col as="form" onSubmit={submitHandler}>
            <label htmlFor="cuil" className="form-label">
              Nro. CUIL
            </label>
            <input type="number" name="cuil" className="form-control" />

            <label htmlFor="cuil" className="form-label">
              Nombre Completo
            </label>
            <input type="text" name="fullName" className="form-control" />

            <label htmlFor="cuil" className="form-label">
              Consultas del mes
            </label>
            <input
              type="number"
              name="consultations"
              className="form-control"
            />

            <Button type="submit" className="mt-3 me-2">
              Cargar Paciente
            </Button>

            <Button type="reset" className="mt-3">
              Limpiar
            </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPatient;
