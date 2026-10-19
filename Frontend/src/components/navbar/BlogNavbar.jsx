import React, { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { AuthContext } from "../../contexts/AuthContext";
import { LogOut, PlusCircle } from "lucide-react";

const NavBar = (props) => {
  const { token, setToken, authorData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="navbar">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <div className="links-nav">
          <Link to={"/"}>HOME</Link>
          <Link to={"/profile"}>PROFILE</Link>
          <Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark"
          >
            <PlusCircle />
            <span>Nuovo Articolo</span>
          </Button>
        </div>
      {token && (
        <div className="account-utilities-navbar">
          <Button className="nav-profile" as={Link} to={"/profile"}>
            <img className="avatar-author" src={authorData?.avatar} />
            <span>{authorData?.name}</span>
          </Button>
          <LogOut className="btn-logout" onClick={handleLogout} />
        </div>
      )}
       </Container>
    </Navbar>
  );
};

export default NavBar;
