import { useAppContext } from "../../../Lib/AppContext";
import { Card, Button } from "react-bootstrap";
import APICalls from "../../../services/APICalls";
import { useNavigate } from "react-router-dom";

const DeleteAppForm = ({toggleShowForm, stages}) => {
  const { appName, appId, setAppName, setAppId } = useAppContext();
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
      window.sessionStorage.removeItem("trellisAppName");
      window.sessionStorage.removeItem("trellisAppId");
      setAppName(undefined);
      setAppId(undefined);
      navigate(`/`);
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  return (
    <>
      <Card.Text>
        Are you sure you want to delete: <text className="stage-row">{appName}</text> ?
      </Card.Text>
      <Button className="m-1 mt-2 settings-btn-delete"  onClick={handleDeleteClick}>
        Delete {appName}
      </Button>
      <Button className="m-1 mt-2 settings-configure-git" onClick={handleCancelClick}>
        Cancel
      </Button>
    </>
  )
}

export default DeleteAppForm;