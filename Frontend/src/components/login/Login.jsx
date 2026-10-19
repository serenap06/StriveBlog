import { useContext, useState } from "react";
import { API_URL } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

export const Login = () => {
  const [formData, setFormData] = useState({});
  const { token, setToken, author, setAuthor } = useContext(AuthContext);
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
      setToken(data.token);
      console.log(token)
      navigate("/");
    } catch (e) {
      console.error(e);
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
            <Col>
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
                  Sign in
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Login;
