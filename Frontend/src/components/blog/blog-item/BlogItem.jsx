import React, { useContext } from "react";
import { Card, CardSubtitle, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
import { FaTag } from "react-icons/fa";
import { StickyNoteX } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext";
import { API_URL } from "../../../services/api";
import { BlogPostContext } from "../../../contexts/BlogPostContext";

const BlogItem = ({ post }) => {
  const { title, cover, author, _id, content, category } = post;

  const { token } = useContext(AuthContext);
  const { getBlogPosts } = useContext(BlogPostContext);

  const deleteBlogPost = async () => {
    try {
      const response = await fetch(`${API_URL}/blogPosts/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        getBlogPosts(post._id);
      }
    } catch (e) {
      console.log(e);
    } finally {
      getBlogPosts();
    }
  };

  return (
    <Card className="blog-card">
      <Link to={`/blogPosts/${_id}`} className="blog-link">
        <Card.Img variant="top" src={cover} className="blog-cover" />
        <Card.Body className="card-body">
          <Card.Header className="blog-header">
            <Card.Title className="blog-title">{title}</Card.Title>
            <CardSubtitle className="blog-subtitle">
              <FaTag />
              {category.toUpperCase()}
            </CardSubtitle>
          </Card.Header>
          <Card.Text
            className="blogPost-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer className="blog-footer">
        <Button type="button" className="btn-delete" onClick={deleteBlogPost}>
          <StickyNoteX />
        </Button>
        <BlogAuthor author={author} />
      </Card.Footer>
    </Card>
  );
};

export default BlogItem;
