import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container, Row, Col } from "react-bootstrap";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  setDoc
} from "firebase/firestore"
import "../css/Login.css";

const Login = () => {
  const reactSwal = withReactContent(Swal);
  const navigate = useNavigate();
  const auth = getAuth();

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
     await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

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
    const email = e.target.email.value;
    const password = e.target.password.value;
    const db = getFirestore();

    try {
      const userRef = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(collection(db,"users"), userRef.user.uid), {
        patients: []
      })

      reactSwal.fire({
        title: "Exito!",
        text: `Se creó su usuario ahora puede ingresar!`,
        icon: "success",
      });
    } catch (err) {
      console.log("Se hizo una consulta en Login");
      reactSwal.fire({
        title: "Error!",
        text: `${err.message}`,
        icon: "error",
      });
    }
  };

  return (
    <Container className="login">
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
