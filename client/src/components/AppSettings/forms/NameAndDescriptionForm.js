import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NameAndDescription = ({ onSubmit, property}) => {
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
  return(
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Control
          componentclass="textarea" 
          value={input} 
          placeholder={`New application ${property}`}
          onChange={(e) => setInput(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update App's {property}
      </Button>
    </Form>
  );
}

export default NameAndDescription;