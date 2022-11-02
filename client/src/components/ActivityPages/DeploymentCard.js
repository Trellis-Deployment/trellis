import "../../stylesheets/AppActivity.css";
import { Row, Card, Col, Button } from "react-bootstrap";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";

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
    <Row className="d-flex">
      <Col className="activity-row m-1 row col-auto">
        <Col>
          <Card.Title className="badge badge-version text-center">V{version}</Card.Title>
        </Col>
        <Col className="text-start">
          <Row>Deployment State: {deployment.deploymentState}</Row>
          <Row className="text-start">
            CommitId: {deployment.commitId}
          </Row>{" "}
       
        <Row className="#">
          Deployment time: {String(new Date(deployment.time))}
        </Row> </Col>
        {idx === 0 ||  deployment.deploymentState !== 'deployed'? null : (
          <Col className="d-flex pe-0 justify-content-end align-items-start">
            <Button 
            className="rollback"
            onClick={handleRollBackClick}>Rollback</Button>
          </Col>
        )}
      </Col>

      <div className="row m-1 form-floating">
          <div className="text-start ps-0 pt-1 presenter">Logs:</div>
          <textarea
            readOnly
            className="logs my-1"
            placeholder={deployment.logs}
            id="floatingTextarea"
          ></textarea>
        </div>
    </Row>
  );
};

export default DeploymentCard;
