import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMedrt, FaListAlt, FaUserPlus } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { getAuth, signOut } from "firebase/auth";
import "../css/Navbar.css";
import { useAccount } from "../context/AccountContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAccount();

  const handleSignout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      console.log("Sesión cerrada correctamente");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div
      className={`sidenavbar ${isOpen ? "open" : "closed"}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <h1>
        <span className="navIcon">
          <FaMedrt />
        </span>
        {isOpen && "Consultorio"}
      </h1>

      <ul className="navlinks">
        <li>
          <NavLink to="/listado">
            <span className="navIcon">
              <FaListAlt />
            </span>
            {isOpen && "Listado"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/agregar">
            <span className="navIcon">
              <FaUserPlus />
            </span>
            {isOpen && "Cargar"}
          </NavLink>
        </li>
      </ul>

      {currentUser && (
        <div className="userWidget" onClick={handleSignout}>
          {isOpen && "Salir"}
          <span className="navIcon">
            <CgLogOut />
          </span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
