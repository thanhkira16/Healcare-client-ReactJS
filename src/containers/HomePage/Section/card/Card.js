import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = (props) => {
  return (
    <>
      <Card className="card pr-1" style={{ width: "inherit" }}>
        <Card.Img variant="top" src={props.imgSrc} />
        <Card.Body>
          <span className="d-block text-center text-xxl main-title">
            Card Title
          </span>
          <span className="sub-title d-block text-lg pt-2 pb-2">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </span>
          <div className="product-actions">
            <span className="btn-see-more"></span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
