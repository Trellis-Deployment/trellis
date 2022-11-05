import { useAppContext } from "../../../Lib/AppContext";
import { Card, Button } from "react-bootstrap";

const DeleteAppForm = ({toggleShowForm}) => {
  const { appName, appId } = useAppContext();
  const handleCancelClick = (e) => {
    e.preventDefault();
    toggleShowForm(false);
  }
  return (
    <>
      <Card.Text>
        Are you sure you want to delete {appName}
      </Card.Text>
      <Button>
        Delete {appName}
      </Button>
      <Button onClick={handleCancelClick}>
        Cancel
      </Button>
    </>
  )
}

export default DeleteAppForm;