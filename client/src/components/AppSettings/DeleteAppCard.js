import { useState } from "react";
import { Row, Card, Button } from "react-bootstrap";
import DeleteAppForm from "./forms/DeleteAppForm";
const DeleteApp = ({stages}) => {
  const [ showForm, toggleShowForm ] = useState(false);
  const handleDeleteClick = (e) => {
    e.preventDefault();
    toggleShowForm(true);
  }

  return(
    <Row className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        Delete Application:
      </Card.Title>
      {showForm ?
      <DeleteAppForm toggleShowForm={toggleShowForm} stages={stages}/> : 
      <Button variant="danger" onClick={handleDeleteClick}>
        Delete Application
      </Button>
      }
    </Row>
  )
}

export default DeleteApp;