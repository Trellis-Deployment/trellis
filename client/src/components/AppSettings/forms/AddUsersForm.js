import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddUsersForm = ({ onSubmit, appUsers, users, toggleShowForm }) => {
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

  const handleCancelClick = (e) => {
    e.preventDefault();
    toggleShowForm(false);
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <p className="text-start">Below are all the users signed up with Trellis other than the current app's owner, select those that you want to access this application</p>

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
        Save
      </Button>
      <Button variant="secondary" onClick={handleCancelClick}>
        Cancel
      </Button>
    </Form>
  )
}

export default AddUsersForm;