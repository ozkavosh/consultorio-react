import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "../context/AccountContext";
import {BeatLoader} from "react-spinners";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Button, Col, Container, Row } from "react-bootstrap";
import verifyCuil from "../utils/verifyCuil";
import "../css/AddPatient.css";

const AddPatient = () => {
  const { patients, currentUser, setPatients } = useAccount();
  const [ cuil, setCuil ] = useState("");
  const [ name, setName ] = useState("");
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setPatients(doc.data().patients);
    });

    return () => {
      unsub();
    };
  }, [currentUser.uid, setPatients]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const { cuil, fullName } = e.target;

    if (verifyCuil(patients, cuil.value))
      return Swal.fire("Error!", "El CUIL ingresado ya existe.", "error");
    if (!cuil.value || !fullName.value)
      return Swal.fire("Error!", "No pueden quedar campos vacios.", "error");

    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        patients: [
          ...patients,
          { cuil: cuil.value, name: fullName.value, monthlyPrescriptions: [] },
        ],
      });

      Swal.fire("Exito!", "Paciente cargado con éxito.", "success");
    } catch (err) {
      console.log("Se hizo una consulta en APatient");
      console.log(err);
      Swal.fire("Error!", "No se pudo cargar al paciente.", "error");
    }
  };

  const validateCuil = async (e) => {
    if(!cuil) return Swal.fire("Error!", "Revise el campo CUIL e intente nuevamente.", "error");
    try{
      setLoading(true);
      const request = await axios.get(`https://ch-simple-login.glitch.me/api/data/person?dni=${cuil}`);
      setCuil(request.data.cuil.replaceAll("-",""));
      setName(request.data.name);
    }catch{
      Swal.fire("Error!", "Hubo un error validando el cuil.", "error");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <Container className="addPatient">
      <Row>
        <Col xs={12}>
          <h2>Agregar Nuevo Paciente</h2>
        </Col>

        <Col as="form" onSubmit={submitHandler}>
          <div>
          <label htmlFor="cuil" className="form-label">
            Nro. CUIL
          </label>
          <input type="number" name="cuil" className="form-control" value={cuil} onChange={(e) => setCuil(e.target.value)} />

          <button type="button" className="btn btn-primary my-2" disabled={loading} onClick={(e) => validateCuil(e)}>{ loading ? <BeatLoader color="#fff"/> : "Validar" }</button>
          </div>

          <label htmlFor="cuil" className="form-label">
            Nombre Completo
          </label>
          <input type="text" name="fullName" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />

          <Button type="submit" className="mt-3 me-2" disabled={loading}>
            Cargar Paciente
          </Button>

          <Button type="reset" className="mt-3" disabled={loading}>
            Limpiar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPatient;
