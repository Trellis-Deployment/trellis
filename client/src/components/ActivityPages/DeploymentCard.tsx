import "../../stylesheets/AppStage.css";
import { Row, Card } from "react-bootstrap";

const DeploymentCard = ({deployment}) => {
  return (
    <Row className="stage-row m-1">
      <Card.Title className="SectionHeader m-1">
        Deployment ID: {deployment.deploymentId}
      </Card.Title>
      <Card.Text className="stage-branch ps-2">
        <Row>
          Deployment State:{deployment.deploymentState}
        </Row>
      </Card.Text>
    </Row>
  )
};

export default DeploymentCard;