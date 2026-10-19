import React, { useContext, useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import { AuthContext } from "../../contexts/AuthContext";
import { API_URL } from "../../services/api";
import { Clock } from "lucide-react";
import CommentList from "../../components/comments/CommentList";

const BlogPostDetail = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getBlogPost = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/blogPosts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Impossibile recuperare il post");
      }
      const dataPost = await response.json();
      console.log(dataPost);
      if (dataPost) {
        setPostData(dataPost.blogPost);
      } else {
        setPostData([]);
        console.log("Formato dati non corretto", dataPost);
      }
    } catch (e) {
      console.log(e);
      setError("Errore nel caricamento del post");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogPost();
  }, [id]);

  return (
    <div className="blog-details-root">
      <Container>
        <Image className="blog-details-cover" src={postData.cover} fluid />
        <h1 className="blog-details-title">{postData.title}</h1>
        <div
          className="blog-content mb-4"
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />
        <div className="blog-details-container">
          <div className="blog-details-author">
            <BlogAuthor author={postData.author} />
          </div>
          <div className="blog-details-info">
            <div className="data">
              <Clock />
              {postData.createdAt}
            </div>
            <div
              style={{
                marginTop: 20,
              }}
            >
              <BlogLike defaultLikes={["123"]} onChange={console.log} />
            </div>
          </div>
        </div>
        <CommentList />
      </Container>
    </div>
  );
};

export default BlogPostDetail;
