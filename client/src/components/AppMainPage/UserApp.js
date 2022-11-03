import "../../App.css";
import "../../stylesheets/AppStage.css";
import { useEffect, useState } from "react";
import APICalls from "../../services/APICalls";
import AppStage from "./AppStage";
import { useAppContext } from "../../Lib/AppContext";
import WebSocket from "../../services/WebSocket";


const UserApp = () => {
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
      <div className="card px-3 py-1 pipes mt-3 mid-wide-card container holder">
        <div className="row">
          <div className="col pipeline-title mb-1 aling-self-end">
            Pipeline
            <a className="ps-2 small-font" href="/apps">
              edit
            </a>
          </div>
          <div className="d-flex col pe-0 justify-content-end align-items-center">
            <a href="/apps" className="small-font">
              View Full Pipeline
            </a>
          </div>
        </div>

        <div className="row col card-back">
          {stages.map((stage) => (
            <AppStage
              key={stage.stageId}
              stage={stage}
              setStages={setStages}
              stages={stages}
            />
          ))}
        </div>
      </div>
  );
};

export default UserApp;
