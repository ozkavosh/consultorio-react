import { BiTrash } from "react-icons/bi";
import { Col, Container, Row, Modal } from "react-bootstrap";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useAccount } from "../context/AccountContext";
import Swal from "sweetalert2";

const PrescriptionModal = ({ show, setShow, patient }) => {
  const { currentUser, patients } = useAccount();
  const db = getFirestore();

  const handleRemove = async (code) => {
    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        patients: [
          ...patients.filter((p) => p.cuil !== patient.cuil),
          {
            cuil: patient.cuil,
            name: patient.name,
            monthlyPrescriptions: patient.monthlyPrescriptions.filter(
              (p) => p.code !== code
            ),
          },
        ],
      });
      Swal.fire(
        "Exito",
        `Se elimino la consulta del paciente ${patient.name}`,
        "success"
      );
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    } finally {
      setShow(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { code } = e.target;

    if (patient.monthlyPrescriptions.length === 2) {
      return Swal.fire(
        "Error",
        "El paciente ya alcanzo las 2 consultas mensuales!",
        "error"
      );
    }

    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        patients: [
          ...patients.filter((p) => p.cuil !== patient.cuil),
          {
            cuil: patient.cuil,
            name: patient.name,
            monthlyPrescriptions: [
              ...patient.monthlyPrescriptions,
              {
                date: new Date(Date.now()).toLocaleDateString("es-MX"),
                code: code.value,
              },
            ],
          },
        ],
      });
      Swal.fire(
        "Exito",
        `Se agregó una consulta al paciente ${patient.name}`,
        "success"
      );
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    } finally {
      setShow(false);
    }
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Consultas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <h5>Paciente: {patient.name}</h5>
            <h6>Cuil: {patient.cuil}</h6>
          </Row>

          <Row className="gap-1 text-light justify-content-center">
            <Col xs={3} className="bg-dark fs-5">
              Fecha
            </Col>
            <Col xs={5} className="bg-dark fs-5">
              Codigo
            </Col>
            <Col xs={3} className="bg-dark fs-5">
              Eliminar
            </Col>
          </Row>

          {patient.monthlyPrescriptions.map((p, id) => (
            <Row key={id} className="mt-1 gap-1 justify-content-center">
              <Col xs={3} className="fs-6">
                {p.date}
              </Col>
              <Col xs={5} className="fs-5">
                {p.code}
              </Col>
              <Col xs={3} className="fs-5">
                <BiTrash
                  className="btnRemove"
                  onClick={() => handleRemove(p.code)}
                />
              </Col>
            </Row>
          ))}

          <Row
            as="form"
            className="mt-5 flex-column"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Col>
              <h5 className="text-start">Nueva Consulta</h5>
            </Col>
            <Col>
              <input
                type="text"
                name="code"
                placeholder="Código de la consulta..."
                className="form-control"
                required
              />
            </Col>

            <Col className="align-self-center mt-3" xs={"auto"}>
              <button type="submit" className="btn btn-dark">
                Cargar Consulta
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PrescriptionModal;
