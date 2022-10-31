import { Row, Card, Col } from "react-bootstrap";

const DeploymentCard = ({deployment, version}) => {
  console.log(deployment);
  return (
    <Col className="stage-row m-1 row bg-white">
      <Card.Title className="SectionHeader m-1">
        V{version}
      </Card.Title>
      <Row className="fw-lighter">
        Deployment State: {deployment.deploymentState}
      </Row>
      <Row className="fs-6">
        CommitId: {deployment.commitId}
      </Row>
      <Row className="fs-6">
        Deployment time: {String(new Date(deployment.time))}
      </Row>
      <Row>
        Logs:
        <textarea readOnly className='bg-light text-light' placeholder={deployment.logs}>
        </textarea>
      </Row> 
    </Col>
  )
};

export default DeploymentCard;