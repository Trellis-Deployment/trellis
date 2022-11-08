import { useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import DeleteAppForm from "./forms/DeleteAppForm";

const DeleteApp = ({ stages }) => {
  const [showForm, toggleShowForm] = useState(false);
  const handleDeleteClick = (e) => {
    e.preventDefault();
    toggleShowForm(true);
  };

  return (
    <Row className="py-1 my-3 mb-5 text-center">
      <Card.Title className="SectionHeader  my-1">
        Delete Application:
      </Card.Title>
      <Row>
        <Col className="mb-3">
          {showForm ? (
            <DeleteAppForm toggleShowForm={toggleShowForm} stages={stages} />
          ) : (
            <Button
              className="btn bttn settings-btn-delete"
              onClick={handleDeleteClick}
            >
              Delete Application
            </Button>
          )}
        </Col>
      </Row>
    </Row>
  );
};

export default DeleteApp;
