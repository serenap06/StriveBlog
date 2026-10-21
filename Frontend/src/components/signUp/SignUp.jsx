import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/api";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const newAuthorOnSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Errore durante la registrazione");
      }
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Impossibile completare la registrazione. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form className="form-group" onSubmit={newAuthorOnSubmit}>
      <Form.Group controlId="email" className="email">
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
      </Form.Group>
      <Form.Group controlId="email" className="email">
        <Form.Control
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Cognome"
          required
        />
      </Form.Group>
      <Form.Group controlId="email" className="email">
        <Form.Control
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </Form.Group>
      <Form.Group controlId="password" className="password">
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </Form.Group>
      <Button
        className="btn btn-form"
        variant="success"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Spinner animation="border" size="sm" /> : "Registrati"}
      </Button>
    </Form>
  );
};

export default SignUp;
