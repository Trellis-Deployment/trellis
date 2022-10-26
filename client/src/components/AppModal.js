import "../stylesheets/AppModal.css";
import MiniNavBar from "./Header/MiniNavBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import APICalls from "../services/APICalls";
import Stage from "./AppMainPage/Stage";

const AppModal = ({ authUser }) => {
  const [stages, setStages] = useState([]);
  const appName = useParams().appName;

  useEffect(() => {
    const getStages = async () => {
      const data = await APICalls.getStages(authUser, appName);
      setStages(data);
    };

    getStages();
  }, [authUser, appName]);

  return (
    <div>
      <div className="px-3">
        <MiniNavBar></MiniNavBar>
      </div>

      <div className="container">
        <div className="card p-2 pipes mt-3 mid-wide-card">
          <div className="container">
            <div className="row">
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
            </div>

            <div className="row border">
              <div className="col  bg-white">
                <div className="row ">
                  {stages.map((stage) => (
                    <Stage key={stage.stageId} stage={stage} authUser={authUser} appName={appName} setStages={setStages} stages={stages}/>
                  ))}
                </div>
                <div className="card mini-card">
                  <row className="stage-title"></row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-3"></div>
    </div>
  );
};

export default AppModal;
