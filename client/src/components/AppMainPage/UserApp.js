import "../../App.css";
import "../../stylesheets/AppStage.css";
import { useEffect, useState } from "react";
import APICalls from "../../services/APICalls";
import AppStage from "./AppStage";
import { useAppContext } from "../../Lib/AppContext";
import WebSocket from "../../services/WebSocket";

const UserApp = () => {
  const [stages, setStages] = useState([]);
  const { appId, userId, appName } = useAppContext();

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
      <div className="row">
        <div className="col pipeline-title mb-1 aling-self-end">
          Pipeline
        </div>
        <div className="d-flex col pe-2 justify-content-end align-items-center">
        <a
            className="ps-2 small-font"
            href={`/application/${appName}/settings`}
          >
            edit
          </a>
        </div>
      </div>

      <div className="mx-0 row card-back">
        {stages.map((stage) => {
          return stage.stageName !== 'prod' ?
          (
          <AppStage
            key={stage.stageId}
            stage={stage}
            setStages={setStages}
            stages={stages}
          />
          ) : null;
        })}
      </div>
      <div className="mx-0 row card-back m-1">
        {
          stages.map((stage) => {
            return stage.stageName === 'prod' ?
          (
          <AppStage
            key={stage.stageId}
            stage={stage}
            setStages={setStages}
            stages={stages}
          />
          ) : null;
          })
        }
      </div>
    </div>
  );
};

export default UserApp;
