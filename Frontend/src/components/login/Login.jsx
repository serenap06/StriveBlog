import { useContext, useState } from "react";
import { API_URL } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  const [formData, setFormData] = useState({});
  const { token, setToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage("Email o password errati");
        return;
      }
      setToken(data.token);
      console.log(token);
      navigate("/");
    } catch (e) {
      console.error(e);
      setErrorMessage("Errore di connessione al server");
    }
  };
  return (
    <Container>
      {token && (
        <Row className="row-logged">
          <h1>
            Sei già loggato, vai ai tuoi <Link to={"/"}>post</Link>{" "}
          </h1>
        </Row>
      )}
      {!token && (
        <>
          <Row>
            <h1>Login</h1>
          </Row>
          <Row>
            <Col className="col-form">
              {errorMessage && <Alert className="alert-error">{errorMessage}</Alert>}
              <Form className="form-group" onSubmit={onSubmit}>
                <Form.Group controlId="email" className="email">
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group controlId="password" className="password">
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  to={"/"}
                  className="btn btn-form"
                  variant="success"
                  type="submit"
                >
                  Accedi
                </Button>
              </Form>
            </Col>
            <Col className="col-btn">
              <Button
                as={Link}
                to={"/signup"}
                className="btn btn-form btn-signUp"
                variant="success"
                type="submit"
              >
                Registrati
              </Button>
              <Button
                as={Link}
                to={"/signup"}
                className="btn btn-form btn-signUp btn-google"
                variant="success"
                type="submit"
              >
                {" "}
                <FaGoogle />
                Accedi con Google
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Login;
