import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NameAndDescription = ({ onSubmit, property, toggleShowForm }) => {
  const [input, setInput] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      alert(`please enter a ${property}`);
      return;
    }
    await onSubmit(input);
    setInput("");
    toggleShowForm(false);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    toggleShowForm(false);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Control
          componentclass="textarea"
          value={input}
          placeholder={`New application ${property}`}
          onChange={(e) => setInput(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="m-1 mt-2">
        Save
      </Button>
      <Button
        className="settings-btn-delete m-1 mt-2"
        onClick={handleCancelClick}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default NameAndDescription;
