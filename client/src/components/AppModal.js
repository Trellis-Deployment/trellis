import "../stylesheets/AppModal.css";
import { useEffect, useState } from "react";
import APICalls from "../services/APICalls";
import Stage from "./AppMainPage/Stage";
import { useAppContext } from "../Lib/AppContext";

const AppModal = () => {
  const [stages, setStages] = useState([]);
  const { userId, appName } = useAppContext();

  useEffect(() => {
    const getStages = async () => {
      const data = await APICalls.getStages(userId, appName);
      setStages(data);
    };

    getStages();
  }, [userId, appName]);

  return (
    <div>
      <div className="card p-2 pipes mt-3 mid-wide-card container">
        <div className="row">
            <div className="col pipeline-title">
              Pipeline
              <a className="ps-2 small-font" href="/apps">
                edit
              </a>
            </div>
            <div className="d-flex col pe-0 justify-content-end align-items-end small-font">
              <a href="/apps">View Full Pipeline</a>
            </div>
        </div>

        <div className="row border">
          <div className="col  bg-white">
            <div className="row ">
              {stages.map((stage) => (
                <Stage 
                  key={stage.stageId}
                  stage={stage}
                  setStages={setStages} 
                  stages={stages}
                />
              ))}
            </div>
            <div className="card mini-card">
            </div>
          </div>
        </div>
      </div>

      <div className="container py-3"></div>
    </div>
  );
};

export default AppModal;
