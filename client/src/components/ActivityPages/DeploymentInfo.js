import "../../stylesheets/AppActivity.css";
import { Row, Card, Col, Button } from "react-bootstrap";

const DeploymentInfo = ({ deployment }) => {
  return (
    <>
      <Row>
       <text>Deployment State: <text>{deployment.deploymentState}</text></text>
       <text>CommitId: <text>{deployment.commitId}</text></text>
       <text>Deployment time: <text>{String(new Date(deployment.time))}</text></text>
      </Row>
      {/* <Row className="text-start">CommitId: {deployment.commitId}</Row> */}
      {/* <Row className="#"> */}
       
      {/* </Row>{" "} */}
    </>
  );
};

export default DeploymentInfo;
