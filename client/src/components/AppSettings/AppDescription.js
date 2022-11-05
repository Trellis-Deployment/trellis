import { useState } from "react";
import { Row, Card, Form, Button } from "react-bootstrap";
import APICalls from "../../services/APICalls";

const AppDescription = ({ app, setApp}) => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newApp = {...app, description: descriptionInput};
    try {
      const data = await APICalls.putApp(newApp);
      setApp(data);
      setDescriptionInput("");
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  return (
    <Row className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        Application Description:
      </Card.Title>
      <Card.Text>
        Current Application description:
        <br />
        - {app.description}
      </Card.Text>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Control
            componentclass="textarea" 
            value={descriptionInput} 
            placeholder="New application description"
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update App's description
        </Button>
      </Form>
    </Row>
  )
}

export default AppDescription;