import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useAccount } from "../context/AccountContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import verifyCuil from "../utils/verifyCuil";
import "../css/EditPatient.css";

const EditPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const { patients, setPatients, currentUser } = useAccount();
  const cuilRef = useRef();
  const fullNameRef = useRef();

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setPatients(doc.data().patients);
    });

    (async () => {
      try {
        const cuil = cuilRef.current;
        const fullName = fullNameRef.current;

        const patientSearch = patients.find((p) => p.cuil === id);
        setPatient(patientSearch);
        cuil.value = patientSearch.cuil;
        fullName.value = patientSearch.name;
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      unsub();
    };
  }, [id, currentUser.uid, setPatients]);

  const resetData = () => {
    const cuil = cuilRef.current;
    const fullName = fullNameRef.current;

    cuil.value = patient.cuil;
    fullName.value = patient.name;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const { cuil, fullName } = e.target;

    if (cuil.value !== patient.cuil && verifyCuil(cuil.value))
      return Swal.fire("Error!", "El CUIL ingresado ya existe.", "error");
    if (!cuil.value || !fullName.value)
      return Swal.fire("Error!", "No pueden quedar campos vacios.", "error");

    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        patients: [
          ...patients.filter(p => p.cuil !== id),
          {
            cuil: cuil.value,
            name: fullName.value,
            monthlyPrescriptions: patient.monthlyPrescriptions,
          },
        ],
      });

      navigate("/listado");

      Swal.fire("Exito!", "Paciente editado con éxito.", "success");
    } catch (err) {
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
            <input
              ref={cuilRef}
              type="number"
              name="cuil"
              className="form-control"
            />

            <label htmlFor="cuil" className="form-label">
              Nombre Completo
            </label>
            <input
              ref={fullNameRef}
              type="text"
              name="fullName"
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
