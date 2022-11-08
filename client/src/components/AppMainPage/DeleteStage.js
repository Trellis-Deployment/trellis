import { Button } from "react-bootstrap";
import APICalls from "../../services/APICalls";

const DeleteStage = ({ stage, setStages }) => {
  const handleDeleteStage = async (e) => {
    e.preventDefault();
    try {
      const data = await APICalls.deleteStage(stage.stageId);
      if (data.error) {
        alert(data.error);
        return;
      }
      alert(`Successfully deleted ${stage.stageName} stage`);
      const stages = await APICalls.getStages(stage.appId);

      setStages(stages);
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  };
  return <Button onClick={handleDeleteStage}>Delete Stage</Button>;
};

export default DeleteStage;
