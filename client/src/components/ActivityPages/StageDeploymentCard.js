import "../../stylesheets/AppStage.css";
import { useState, useEffect } from "react";
import DeploymentCard from "./DeploymentCard";
import APICalls from "../../services/APICalls";
import { Col, Card } from "react-bootstrap";

const StageDeploymentCard = ({stage}) => {
  const [deployments, setDeployments] = useState([]);
  useEffect(() => {
    const getDeployments = async() => {
      const data = await APICalls.getDeployments(stage.stageId);
      setDeployments(data);
    }
    getDeployments();
  }, [stage.stageId]);

  console.log({deployments});
  return (
    <Col className="stage-row m-1">
      <Card.Title className="SectionHeader m-1">
        {stage.stageName} Deployments:
        {deployments.map((deployment, idx) => (
          <DeploymentCard
            key={deployment.deploymentId}
            deployment={deployment}
            version={deployments.length - idx}
            idx={idx}
            stageId={stage.stageId}
            setDeployments={setDeployments}>
          </DeploymentCard>
        ))}
      </Card.Title>
    </Col>
  )
}

export default StageDeploymentCard;