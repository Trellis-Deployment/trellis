import { useAppContext } from "../../../Lib/AppContext";
import { Card, Button } from "react-bootstrap";
import APICalls from "../../../services/APICalls";
import { useNavigate } from "react-router-dom";

const DeleteAppForm = ({toggleShowForm, stages}) => {
  const { appName, appId } = useAppContext();
  const navigate = useNavigate();
  const handleCancelClick = (e) => {
    e.preventDefault();
    toggleShowForm(false);
  }

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      const data = await APICalls.deleteApp(appId);
      console.log({ data });
      if(data.error) {
        alert(data.error);
        return;
      }
      navigate('/apps');
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  return (
    <>
      <Card.Text>
        Are you sure you want to delete {appName}
      </Card.Text>
      <Button onClick={handleDeleteClick}>
        Delete {appName}
      </Button>
      <Button onClick={handleCancelClick}>
        Cancel
      </Button>
    </>
  )
}

export default DeleteAppForm;