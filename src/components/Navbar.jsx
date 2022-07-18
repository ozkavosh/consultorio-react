import React from "react";
import { Navbar as BsNavbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { FaMedrt } from "react-icons/fa";
import { useAccount } from "../context/AccountContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { token, setToken } = useAccount();

  return (
    <BsNavbar className="mb-2 navbar" bg="dark" expand="lg" variant="dark">
      <Container>
        <BsNavbar.Brand>
          <Link className="text-decoration-none" to="/">
            <h1 className="text-light fs-3"><FaMedrt/> Consultorio</h1>
          </Link>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navBar" />
        <BsNavbar.Collapse id="navBar" className="justify-content-lg-end">
          <Nav>
            <NavLink
              to="/listado"
              className="nav-link"
              activeclassname="active"
            >
              LISTADO
            </NavLink>
            <NavLink
              to="/agregar"
              className="nav-link"
              activeclassname="active"
            >
              AGREGAR
            </NavLink>
            { token && <NavDropdown
              id="nav-dropdown-dark-example"
              title="Perfil"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Ver perfil</NavDropdown.Item>
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item onClick={() => setToken("")}>
                Salir
              </NavDropdown.Item>
            </NavDropdown>}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
