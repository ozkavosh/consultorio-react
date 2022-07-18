import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Footer.css";

const Footer = () => {
  return (
    <Container as={"footer"} className="bg-dark mt-2" fluid>
      <Container className="py-3">
        <Row>
          <Col xs={'auto'}>
            <Link className="text-decoration-none" to="/">
              <h2 className="text-light">Consultorio</h2>
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
