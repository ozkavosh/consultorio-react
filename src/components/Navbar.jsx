import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaMedrt, FaListAlt, FaUserPlus } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { useAccount } from "../context/AccountContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { token, setToken } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidenavbar ${isOpen ? "open": "closed"}`} onClick={() => setIsOpen(!isOpen)}>
      <h1> <span class="navIcon"><FaMedrt/></span> { isOpen && "Consultorio"} </h1>

      <ul className="navlinks">
        <li> <NavLink to="/listado"> <span class="navIcon"><FaListAlt/></span> {isOpen && "Listado"}</NavLink> </li>
        <li> <NavLink to="/agregar"> <span class="navIcon"><FaUserPlus/></span> {isOpen && "Cargar"}</NavLink> </li>
      </ul>

      <div className="userWidget" onClick={() => token && setToken("")}>
        {isOpen && (token ? "Salir" : "Ingresar")} <span class="navIcon"><CgLogOut/></span>
      </div>
    </div>
  );
};

export default Navbar;

