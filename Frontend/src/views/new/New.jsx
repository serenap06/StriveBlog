import React, { useContext, useState } from "react";
import { Button, Container, Form, Alert, FormGroup } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/api";

const NewBlogPost = (props) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Generico",
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [coverFile, setCoverFile] = useState(null);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleChangeCover =(e)=>{
    setCoverFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const htmlContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    const payload = {
      title: formData.title,
      category: formData.category,
      content: htmlContent,
    };
    try {
      const response = await fetch(`${API_URL}/blogPosts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Errore durante la creazione del post");
      }
      const newPost = await response.json()
      const blogPostId = newPost.blogPost?._id
      if (coverFile && blogPostId) {
        const coverFormData = new FormData()
        coverFormData.append("cover",coverFile)
        const coverResponse = await fetch(`${API_URL}/blogPosts/${blogPostId}/cover`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: coverFormData,
      })
      if (!coverResponse.ok) {
          throw new Error("Post creato, ma c'è stato un errore nel caricamento della copertina");
        }
      }
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Impossibile creare il post");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Container className="new-blog-container">
      <h2>Crea un nuovo post</h2>
      {error && <Alert>{error}</Alert>}
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChangeInput}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Immagine di Copertina</Form.Label>
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="form-control"
            onChange={handleChangeCover}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            name="category"
            value={formData.category}
            onChange={handleChangeInput}
          >
            <option>Generico</option>
            <option>Economia Circolare</option>
            <option>Storie & Attivismo</option>
            <option>Biodiversità & Animali</option>
            <option>Green Tech & Innovazione</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            className="new-blog-content"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button
            type="button"
            size="lg"
            variant="outline-dark"
            onClick={() => {
              setFormData({ title: "", category: "Generico" });
              setEditorState(EditorState.createEmpty());
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
            disabled={isLoading}
          >
            {isLoading ? "Invio in corso..." : "Invia"}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
