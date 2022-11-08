import "../../stylesheets/AppActivity.css";
import { Button } from "react-bootstrap";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
import Logs from "./Logs";

const DeploymentCard = ({
  deployment,
  version,
  idx,
  stageId,
  setDeployments,
}) => {
  const { userId, appId } = useAppContext();
  const handleRollBackClick = async (e) => {
    e.preventDefault();
    try {
      await APICalls.buildStage({
        userId,
        appId,
        stageId,
        commitId: deployment.commitId,
      });
      const data = await APICalls.getDeployments(stageId);
      setDeployments(data);
    } catch (e) {
      alert(e.message);
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col col-auto align-self-center">
          <div className="card-title badge badge-version">V{version}</div>
        </div>

        <div className="col activity-row m-1">
          <div className="row">
            <div className="col col-auto">
              <p className="dep-key">Deployment State: </p>
            </div>
            <div className="col">
              <p className="dep-value">{deployment.deploymentState}</p>
            </div>
          </div>
          <div className="row">
            <div className="col col-auto">
              <p className="dep-key">CommitId:</p>{" "}
            </div>
            <div className="col">
              <p className="dep-value">{deployment.commitId}</p>
            </div>
          </div>
          <div className="row">
            <div className="col col-auto">
              <p className="dep-key">Deployment time: </p>
            </div>
            <div className="col">
              <p className="dep-value">{String(new Date(deployment.time))}</p>
            </div>
          </div>
        </div>
        <div className="col col-2">
          {idx === 0 || deployment.deploymentState !== "deployed" ? null : (
            <div className="col text-sm-center">
              <Button className="rollback" onClick={handleRollBackClick}>
                Rollback
              </Button>
            </div>
          )}
        </div>
      </div>
      <Logs logs={deployment.logs}></Logs>
    </>
  );
};

export default DeploymentCard;
