import "../../stylesheets/AppStage.css";
import { useState, useEffect } from "react";
import StageDeploymentCard from "./StageDeploymentCard";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
import WebSocket from "../../services/WebSocket";
import { Row } from "react-bootstrap";

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
      <Row className="mx-0 card-back">
        {stages.map((stage) => stage.stageName !== 'prod' ? (
          <StageDeploymentCard
            key={stage.stageId}
            stage={stage}
          ></StageDeploymentCard>
        ) : null)}
      </Row>
      <Row className="mx-0 card-back m-1">
        {stages.map((stage) => stage.stageName === 'prod' ? (
          <StageDeploymentCard
            key={stage.stageId}
            stage={stage}
          ></StageDeploymentCard>
        ) : null)}
      </Row>
    </div>
  );
};

export default AppActivity;
