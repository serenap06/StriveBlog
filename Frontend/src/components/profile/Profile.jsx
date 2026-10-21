import { useContext, useState,useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./profile.css";
import { ImagePlus } from "lucide-react";
import { API_URL } from "../../services/api";

const Profile = () => {
  const { authorData, token, setAuthorData} = useContext(AuthContext);
  const [avatarFile, setAvatarFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleChangeAvatar = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const uploadAvatar = async (e) => {
    if (!avatarFile) {
      setError("Seleziona un'immagine");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    const authorId = authorData._id;
    try {
      const response = await fetch(`${API_URL}/authors/${authorId}/avatar`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Errore durante il carimento del file");
      }
      const data = await response.json();
      setAuthorData((prev) => ({
        ...prev,
        avatar: data.avatar || data.authorData?.avatar
      }));
      setAvatarFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (e) {
      console.error(e);
      setError("Errore nel salvataggio dell'avatar");
    } finally {
      setIsLoading(false);
      window.location.reload()
    }
  };

  return (
    <Container className="container-author">
      <Row>
        <h1>Profilo Autore</h1>
      </Row>
      <Row className="row-author">
        <Col>
          <Image className="avatar" src={authorData?.avatar}></Image>
        </Col>
        <Col className="author-name">
        <h2>
          {authorData?.name} {authorData?.surname}
        </h2>
        <span>{authorData?.email}</span>
      </Col>
      </Row>
      <Row>
        <h3>Modifica avatar</h3>
        <Col>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChangeAvatar}
            className="input"
            ref={fileInputRef}
          />
          <Button
            className="btn-edit-img"
            onClick={uploadAvatar}
            disabled={isLoading || !avatarFile}
          >
            Invia
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
