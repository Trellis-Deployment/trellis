import "../../stylesheets/AppActivity.css";
import { Row, Card, Col, Button } from "react-bootstrap";
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
    <Row className="d-flex">
      <Col className="activity-row m-1 row col-auto">
        <Col>
          <Card.Title className="badge badge-version text-center">
            V{version}
          </Card.Title>
        </Col>
        <Col className="text-start stage-info">
          <Row>Deployment State: {deployment.deploymentState}</Row>
          <Row className="text-start">CommitId: {deployment.commitId}</Row>{" "}
          <Row className="#">
            Deployment time: {String(new Date(deployment.time))}
          </Row>{" "}
        </Col>
        {idx === 0 || deployment.deploymentState !== "deployed" ? null : (
          <Col className="d-flex pe-0 justify-content-end align-items-start">
            <Button className="rollback" onClick={handleRollBackClick}>
              Rollback
            </Button>
          </Col>
        )}
      </Col>


    </Row>
        <Logs logs={deployment.logs} ></Logs>
    </>
  );
};

export default DeploymentCard;
