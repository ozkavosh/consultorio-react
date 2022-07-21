import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';

const Patient = ({ patient, removePatient }) => {
  return (
    <Row className="gap-1 justify-content-center patientRow">
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
          onClick={() => removePatient(patient.id, patient.fullName)}
        />
      </Col>
    </Row>
  );
};

export default Patient;
