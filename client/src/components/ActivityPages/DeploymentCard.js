import { Row, Card, Col, Button } from "react-bootstrap";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
const DeploymentCard = ({deployment, version, idx, stageId, setDeployments}) => {
  const { userId, appName } = useAppContext();
  const handleRollBackClick = async (e) => {
    e.preventDefault();
    try {
      await APICalls.buildStage({ userId, appName, stageId, commitId: deployment.commitId });
      const data = await APICalls.getDeployments(stageId);
      setDeployments(data);
    } catch(e) {
      alert(e.message);
      console.log(e.message);
    }
  }

  return (
    <Col className="stage-row m-1 row bg-white">
      <Row className="text-center">
        <Col>
          <Card.Title className="SectionHeader m-1 fs-1">
            V{version}
          </Card.Title>
        </Col>
        {idx === 0 || deployment.deploymentState !== 'deployed'? null : 
          <Col>
            <Button onClick={handleRollBackClick}>Rollback</Button>
          </Col>
        }
        
      </Row>
      <Row className="m-1 fs-6">
        Deployment State: {deployment.deploymentState}
      </Row>
      <Row className="m-1 fs-6">
        CommitId: {deployment.commitId}
      </Row>
      <Row className="m-1 fs-6">
        Deployment time: {String(new Date(deployment.time))}
      </Row>
      <Row className="m-1">
        Logs:
        <textarea readOnly className='bg-light text-light' placeholder={deployment.logs}>
        </textarea>
      </Row> 
      
    </Col>
  )
};

export default DeploymentCard;