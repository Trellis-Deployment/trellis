import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import APICalls from "../../../services/APICalls";

const AddUsersForm = ({ onSubmit, appUsers, users }) => {
  const [updatedUsers, setUpdatedUsers] = useState([]);

  useEffect(() => {
    setUpdatedUsers(appUsers);
  }, [appUsers]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(updatedUsers);
  }

  const handleCheckToggle = (login) => {
    if (updatedUsers.find(userLogin => login === userLogin)) {
      setUpdatedUsers(updatedUsers.filter(userLogin => userLogin !== login));
    } else {
      setUpdatedUsers(updatedUsers.concat(login));
    }
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <p className="text-start">User:</p>

        {users.map((user, idx) => (
          <Form.Check 
            key={idx} 
            type="checkbox"
            label={user.githubLogin}
            checked={updatedUsers.some(userLogin => user.githubLogin === userLogin)}
            onChange={() => handleCheckToggle(user.githubLogin)}
          />
        ))}
      </Form.Group>
      <Button variant="primary" type="submit">
        Update App's Users
      </Button>
    </Form>
  )
}

export default AddUsersForm;