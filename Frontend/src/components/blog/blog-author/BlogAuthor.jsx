import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = ({author}) => {
if(!author) return null

  return (
    <Row className="row-author">
      <Col xs={"auto"} className="pe-0">
        <Image className="avatar-author" src={author.avatar} roundedCircle />
      </Col>
      <Col>
        <h4>{author.name}</h4>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
