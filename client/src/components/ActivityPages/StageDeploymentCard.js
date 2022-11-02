import "../../stylesheets/AppStage.css";
import { useState, useEffect } from "react";
import DeploymentCard from "./DeploymentCard";
import APICalls from "../../services/APICalls";
import { Col, Card, Row } from "react-bootstrap";

const StageDeploymentCard = ({stage}) => {
  const [deployments, setDeployments] = useState([]);
  useEffect(() => {
    const getDeployments = async() => {
      const data = await APICalls.getDeployments(stage.stageId);
      setDeployments(data);
    }
    getDeployments();
  }, [stage.stageState, stage.stageId]);

  return (
    <Col className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        {stage.stageName} Deployments:
        {deployments.map((deployment, idx) => (
          <Row key={deployment.deploymentId} className="stage-info ps-3">
            <DeploymentCard
              key={deployment.deploymentId}
              deployment={deployment}
              version={deployments.length - idx}
              idx={idx}
              stageId={stage.stageId}
              setDeployments={setDeployments}>
            </DeploymentCard>
          </Row>
        ))}
      </Card.Title>
    </Col>
  )
}

export default StageDeploymentCard;