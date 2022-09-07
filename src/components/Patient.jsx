import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { FaRegEdit, FaEye } from 'react-icons/fa';

const Patient = ({ patient, removePatient, prescriptionList }) => {
  return (
    <Row className="gap-1 justify-content-center patientRow">
      <Col xs={3} className="text-center">
        {patient.cuil}
      </Col>
      <Col xs={3} className="text-center">
        {patient.name}
      </Col>
      <Col xs={2} className="text-center">
        {`${patient.monthlyPrescriptions.length} `}<FaEye className="btnRemove" onClick={() => prescriptionList(patient.cuil)} />
      </Col>
      <Col xs={1} className="text-center">
        <Link to={`/editar/${patient.cuil}`}>
          <FaRegEdit className="btnEdit" />
        </Link>
      </Col>
      <Col xs={1} className="text-center">
        <BiTrash
          className="btnRemove"
          onClick={() => removePatient(patient.cuil, patient.fullName)}
        />
      </Col>
    </Row>
  );
};

export default Patient;
