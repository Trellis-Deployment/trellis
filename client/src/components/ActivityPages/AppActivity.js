import "../../stylesheets/AppStage.css";
import { useState, useEffect } from "react";
import StageDeploymentCard from "./StageDeploymentCard";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
import WebSocket from "../../services/WebSocket";

const AppActivity = () => {
  const [stages, setStages] = useState([]);

  const { appId, userId } = useAppContext();
  useEffect(() => {
    const updateStages = async () => {
      const data = await APICalls.getStages(appId);
      setStages(data);
    }
    updateStages();
    const newWebSocket = new WebSocket({userId, setStages, appId});

    return () => {
      newWebSocket.endConnection(userId);
    }
  }, [appId, userId]);
  return (
  <div className="pipes pipeline-title">
    Activity
    <div className="bg-white row">
      {stages.map(stage => (
        <StageDeploymentCard key={stage.stageId} stage={stage} setStages={setStages}></StageDeploymentCard>
      ))}
    </div>
  </div>
  )
}

export default AppActivity;