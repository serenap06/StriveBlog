import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { token } = useContext(AuthContext);
  return (
    <Container fluid="sm">
      {token && (
        <>
          <h1 className="blog-main-title mb-3">Benvenuto su StriveBlog!</h1>
          <BlogList />
        </>
      )}
      {!token && (
        <h1 className="blog-main-title">
          Effettua il{" "}
          <Button className="btn-login" as={Link} to={"/login"}>
            login
          </Button>{" "}
          per accedere a StriveBlog oppure{" "}
          <Button className="btn-login" as={Link} to={"/signup"}>
            registrati.
          </Button>
        </h1>
      )}
    </Container>
  );
};

export default Home;
