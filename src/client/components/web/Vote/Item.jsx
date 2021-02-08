import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default function Item({ item, vote }) {
  function handleVote() {
    vote(item.id);
  }

  return (
    <Col lg={4} md={6} className="mb-4">
      <Card className="shadow-sm h-100">
        <Card.Img variant="top" src={`${item.imgSrc}`} alt="" />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <Button onClick={handleVote} variant="primary">
            Vote for this item
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
