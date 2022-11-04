import { useState, useEffect } from "react";
import { Row, Card, Form, Button} from "react-bootstrap";

const AppDescription = ({ description, setDescription, app}) => {
  const [descriptionInput, setDescriptionInput] = useState("New application description");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newApp = {...app, description: descriptionInput};
    console.log(newApp);
  }
  return (
    <Row className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        Application Description: 
      </Card.Title>
      <Card.Text>
        Current Application description:
      </Card.Text>
      <Card.Text>
        {description}
      </Card.Text>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Control componentclass="textarea" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update App's description
        </Button>
      </Form>
    </Row>
  )
}

export default AppDescription;