import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container, Row, Col } from "react-bootstrap";
import { useAccount } from "../context/AccountContext";

const Login = () => {
  const reactSwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { token, setToken } = useAccount();

  useEffect(() => {
    token && navigate("/listado");
  }, [navigate, token]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      return reactSwal.fire({
        title: "Error!",
        text: "No se pueden ingresar campos vacios!",
        icon: "error",
      });
    }

    try {
      const response = await axios.post(
        "https://ch-simple-login.glitch.me/api/login",
        { email, password }
      );
      setToken(response.data.token);

      navigate("/listado");

      reactSwal.fire({
        title: "Exito!",
        text: `Ingresaste correctamente!`,
        icon: "success",
      });
    } catch (err) {
      console.error(err.message);
      reactSwal.fire({
        title: "Error!",
        text: `No se pudo ingresar :(`,
        icon: "error",
      });
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password || !username) {
      return reactSwal.fire({
        title: "Error!",
        text: "No se pueden ingresar campos vacios!",
        icon: "error",
      });
    }

    try {
      await axios.post(
        "https://ch-simple-login.glitch.me/api/register",
        { username, email, password }
      );

      console.log("Se hizo una consulta en Login");

      reactSwal.fire({
        title: "Exito!",
        text: `Registrado correctamente ahora puedes ingresar con tu cuenta!`,
        icon: "success",
      });
    } catch (err) {
      console.log("Se hizo una consulta en Login");
      console.error(err.message);
      reactSwal.fire({
        title: "Error!",
        text: `El email ya se encuentra registrado!`,
        icon: "error",
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Ingresar</h2>
          <form onSubmit={loginHandler}>
            <label className="form-label" htmlFor="email">
              Correo
            </label>
            <input
              className="form-control mb-2"
              type="email"
              name="email"
              placeholder="Ingrese su correo..."
              required
            />
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              className="form-control mb-2"
              type="password"
              name="password"
              placeholder="Ingrese su contraseña..."
              required
            />
            <button className="btn btn-dark" type="submit">
              Ingresar
            </button>
          </form>
        </Col>
        <Col>
          <h2>Crear Cuenta</h2>
          <form onSubmit={registerHandler}>
          <label className="form-label" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              className="form-control mb-2"
              type="text"
              name="username"
              minLength={4}
              maxLength={9}
              placeholder="Ingrese su usuario..."
              pattern="[a-zA-Z0-9]*"
              required
            />
            <label className="form-label" htmlFor="email">
              Correo
            </label>
            <input
              className="form-control mb-2"
              type="email"
              name="email"
              placeholder="Ingrese su correo..."
              required
            />
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              className="form-control mb-2"
              type="password"
              name="password"
              placeholder="Ingrese su contraseña..."
              required
            />
            <button className="btn btn-dark" type="submit">
              Crear Cuenta
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
