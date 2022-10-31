import { Row, Card, Col } from "react-bootstrap";

const DeploymentCard = ({deployment, version}) => {
  console.log(deployment);
  return (
    <Col className="stage-row m-1 row bg-white">
      <Card.Title className="SectionHeader m-1">
        V{version}
      </Card.Title>
      <Row>
        Deployment State: {deployment.deploymentState}
      </Row>
      <Row>
        CommitId: {deployment.commitId}
      </Row>
      <Row>
        Deployment time: {String(new Date(deployment.time))}
      </Row>
      <Row >
        Logs:
        <textarea readOnly className='bg-light text-light' placeholder={deployment.logs}>
        </textarea>
      </Row> 
    </Col>
  )
};

export default DeploymentCard;