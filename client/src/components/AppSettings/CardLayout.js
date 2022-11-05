import { Row, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

const CardLayout = ({property, appValue, onSubmit}) => {
  const [input, setInput] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      alert(`please enter a ${property}`);
      return;
    }
    await onSubmit(input);
    setInput("");
  }

  return (
    <Row className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        Application {property}:
      </Card.Title>
      <Card.Text>
        Current Application {property}:
        <br />
        - {appValue}
      </Card.Text>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Control
            componentclass="textarea" 
            value={input} 
            placeholder="New application description"
            onChange={(e) => setInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update App's {property}
        </Button>
      </Form>
    </Row>
  )
}

export default CardLayout;