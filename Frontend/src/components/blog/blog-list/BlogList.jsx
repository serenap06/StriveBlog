import React, { useContext } from "react";
import { Alert, Col, Row, Spinner,Button } from "react-bootstrap";
import {Link} from "react-router-dom"
import BlogItem from "../blog-item/BlogItem";
import { BlogPostContext } from "../../../contexts/BlogPostContext";
import "./BlogList.css";
import { PlusCircleIcon } from "lucide-react";
const BlogList = () => {
  const { blogPostData, isLoading, error } = useContext(BlogPostContext);
  console.log(blogPostData);
  return (
    <Row className="row">
      {blogPostData.length === 0 && (
        <Col className="add-first-post-col">
          <p>Non ci sono post, aggiungi il primo</p>
          <Button
            as={Link}
            to="/new"
            className="add-button bg-dark"
            size="lg"
          >
            <PlusCircleIcon/>
            <span>Nuovo Articolo</span>
          </Button>
        </Col>
      )}
      {isLoading && (
        <div className="text-center my-5">
          <Spinner animation="grow" variant="success"></Spinner>
          <p className="mt-2">Caricamento in corso...</p>
        </div>
      )}
      {error && !isLoading && <Alert variant="danger">{error}</Alert>}
      {blogPostData.map((post) => (
        <Col className="blogPostList" key={post._id} md={4}>
          <BlogItem className="card" post={post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
