import "../../stylesheets/AppActivity.css";
import { Row, Card, Col, Button } from "react-bootstrap";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
import Logs from "./Logs";
import DeploymentInfo from "./DeploymentInfo";

const DeploymentCard = ({
  deployment,
  version,
  idx,
  stageId,
  setDeployments,
}) => {
  const { userId, appName } = useAppContext();
  const handleRollBackClick = async (e) => {
    e.preventDefault();
    try {
      await APICalls.buildStage({
        userId,
        appName,
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
    <Row className="#">
      <Col className="activity-row m-1 row col-auto">
        <Col className="col-auto align-self-center">
          <Card.Title className="badge badge-version">
            V{version}
          </Card.Title>
        </Col>
        <Col className="text-start stage-info col-8">
          {/* <DeploymentInfo deployment={deployment}></DeploymentInfo> */}
          <Row>
       <text className="dep-key">Deployment State: <text className="dep-value">{deployment.deploymentState}</text></text>
       <text className="dep-key">CommitId: <text className="dep-value">{deployment.commitId}</text></text>
       <text className="dep-key">Deployment time: <text className="dep-value">{String(new Date(deployment.time))}</text></text>
      </Row>
        </Col>
        {/* {idx === 0 || deployment.deploymentState !== "deployed" ? null : ( */}
          <Col className="col-1 justify-content-end align-items-start">
            <Button className="rollback" onClick={handleRollBackClick}>
              Rollback
            </Button>
          </Col>
        {/* )} */}
      </Col>


    </Row>
        <Logs logs={deployment.logs} ></Logs>
    </>
  );
};

export default DeploymentCard;
