import { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API_URL } from "../../../services/api";
import { AuthContext } from "../../../contexts/AuthContext";

const AddCommentForm = ({ blogPostId, onCommentAdded }) => {
  const { token } = useContext(AuthContext);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const [inputComment, setInputComment] = useState({
    text: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputComment({
      ...inputComment,
      [name]: value,
    });
  };

  useEffect(() => {
    setInputComment({ text: "" });
  }, [blogPostId]);

  const onSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/blogPosts/${blogPostId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputComment),
      });
      if (!response.ok) {
        setError("Impossibile inviare il commento");
      }
      setIsSent(!isSent);
      setInputComment({
        text: "",
      });
      if(onCommentAdded){
        onCommentAdded()
      }
      setTimeout(() => setIsSent(false), 3000)
    } catch (e) {
      console.error(e);
      setError("Errore nell'invio del commento");
    }
  };
  return (
    <Form onSubmit={onSubmitComment}>
      <Form.Group>
        <Form.Control
          className="w-100"
          value={inputComment.text}
          onChange={onChangeInput}
          type="text"
          placeholder="Inserisci il tuo commento..."
          name="text"
          required
        ></Form.Control>
        <Button type="submit">
          {isSent ? "Commento inviato" : "Invia commento"}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddCommentForm