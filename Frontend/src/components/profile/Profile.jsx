import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Col,Image } from "react-bootstrap";
import "./profile.css"

const Profile = () => {
  const { authorData } = useContext(AuthContext);

  return (
    <Container className="container-author">
      <Row><h1>Profilo Autore</h1></Row>
      <Row>
        <Col className="author-title">
        <Image className="avatar" src={authorData?.avatar}></Image>
        <h2>{authorData?.name} {authorData?.surname}</h2>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Profile;
