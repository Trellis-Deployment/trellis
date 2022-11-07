import { Button } from "react-bootstrap";
import APICalls from "../../services/APICalls";
const DeleteStage = ({stage, setStages}) => {
  const handleDeleteStage = async (e) => {
    e.preventDefault();
    if (stage.stageState === "deployed" || stage.stageState === "deploying") {
      alert("Please tear down the stage before deleting it");
      return;
    } else if (stage.stageState === "error") {
      const deployments = APICalls.getDeployments(stage.stageId);
      let valid = true;
      for (const deployment of deployments) {
        if (deployment.deploymentState === 'removed') {
          valid = true;
          break;
        } else if (deployment.deploymentState === 'deployed') {
          valid = false;
          break;
        }
      }
      if (!valid) {
        alert("Please rollback to your last successful deployment and then tear it down");
        return;
      }
    }
    try {
      await APICalls.deleteStage(stage.stageId);
      alert(`Successfully deleted ${stage.stageName} stage`);
      const stages = await APICalls.getStages(stage.appId);
      setStages(stages);
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  return(
    <Button onClick={handleDeleteStage}>Delete Stage</Button>
  );
}

export default DeleteStage;