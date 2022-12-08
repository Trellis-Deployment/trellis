import "../../stylesheets/AppStage.css";
import { useState, useEffect } from "react";
import StageDeploymentCard from "./StageDeploymentCard";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
import WebSocket from "../../services/WebSocket";
import { Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";

const AppActivity = () => {
  const [stages, setStages] = useState([]);

  const { appId, userId } = useAppContext();
  useEffect(() => {
    const updateStages = async () => {
      const data = await APICalls.getStages(appId);
      setStages(data);
    };
    updateStages();
    const newWebSocket = new WebSocket({ userId, setStages, appId });

    return () => {
      newWebSocket.endConnection(userId);
    };
  }, [appId, userId]);


  return (
    <div className="card px-3 py-1 pipes mt-3 mid-wide-card container holder">
      <Row>
        <div className="col pipeline-title mt-1">Activity</div>
      </Row>
      <Row>
        <Col className="mx-0 card-back m-1 text-dark text-center">
          Development
          {stages.map((stage) => stage.stageName !== 'prod' && stage.stageName !== 'staging' ? (
            <StageDeploymentCard
              key={stage.stageId}
              stage={stage}
            ></StageDeploymentCard>
          ) : null)}
        </Col>
        <Col md="auto">
          <ArrowRight size={16}/>
        </Col>
        <Col className="mx-0 card-back m-1 text-dark text-center">
          Staging
          {stages.map((stage) => stage.stageName === 'staging' ? (
            <StageDeploymentCard
              key={stage.stageId}
              stage={stage}
            ></StageDeploymentCard>
          ) : null)}
        </Col>
        <Col md="auto">
          <ArrowRight size={16}/>
        </Col>
        <Col className="mx-0 card-back m-1 text-dark text-center">
          Production
          {stages.map((stage) => stage.stageName === 'prod' ? (
            <StageDeploymentCard
              key={stage.stageId}
              stage={stage}
            ></StageDeploymentCard>
          ) : null)}
        </Col>
      </Row>

    </div>
  );
};

export default AppActivity;
