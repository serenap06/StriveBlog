import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { API_URL } from "../../services/api";
import { Col, Container, Row, Alert, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { StickyNoteX } from "lucide-react";
import AddCommentForm from "./addComments/AddCommentForm";

const CommentList = () => {
  const [commentData, setCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  const { id: blogPostId } = useParams();

  const getComments = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${API_URL}/blogPosts/${blogPostId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Impossibile recuperare i commenti");
      }
      const data = await response.json();
      setCommentData(data.comments);
      console.log("commenti:", data);
    } catch (e) {
      console.error(e);
      setError("Impossibile caricare i commenti");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, [blogPostId]);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${API_URL}/blogPosts/${blogPostId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        getComments();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h4>Commenti</h4>
        </Col>
      </Row>

      {isLoading && <p>Caricamento commenti...</p>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!isLoading && commentData.length === 0 && (
        <>
          <p>Non ci sono ancora commenti, aggiungi il tuo:</p>
          <AddCommentForm blogPostId={blogPostId} onCommentAdded={getComments} />
        </>
      )}
      <Row>
        <Col>
          {commentData &&
            commentData.length > 0 &&
            commentData.map((comment) => (
              <div
                key={comment._id || comment.id}
                className="mb-3 p-3 border rounded"
              >
                <p className="mb-1">{comment.text}</p>
                <small className="text-muted">
                  Scritto da: {comment.author?.name || "Utente"}
                </small>
                <Button
                  type="button"
                  className="btn-delete"
                  onClick={() => {
                    handleDeleteComment(comment._id);
                  }}
                >
                  <StickyNoteX />
                </Button>
              </div>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CommentList;
