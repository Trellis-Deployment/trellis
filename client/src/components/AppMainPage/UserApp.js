import "../../App.css";
import "../../stylesheets/AppStage.css";
import { useEffect, useState } from "react";
import APICalls from "../../services/APICalls";
import AppStage from "./AppStage";
import { useAppContext } from "../../Lib/AppContext";

const UserApp = () => {
  const [stages, setStages] = useState([]);
  const { appId } = useAppContext();

  useEffect(() => {
    const getStages = async () => {
      const data = await APICalls.getStages(appId);
      setStages(data);
    };

    getStages();
  }, [appId]);

  return (
    <div>
      <div className="card px-3 py-1 pipes mt-3 mid-wide-card container lips">
        <div className="row">
          <div className="col pipeline-title mb-1">
            Pipeline
            <a className="ps-2 small-font" href="/apps">
              edit
            </a>
          </div>
          <div className="d-flex col pe-0 justify-content-end align-items-end">
            <a href="/apps" className="small-font">
              View Full Pipeline
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col card-back">
            <div className="row">
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
        </div>
      </div>

      <div className="container py-3"></div>
    </div>
  );
};

export default UserApp;
