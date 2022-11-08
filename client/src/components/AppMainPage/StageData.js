import "../../App.css";
import "../../stylesheets/AppStage.css";
import { useState } from "react";
import BranchSettings from "./BranchSettings";
import CommitId from "./CommitId";
// import Details from "./Details";

import {
  CloudCheck,
  ExclamationCircle,
  FileEarmarkBinary,
  Gear,
  FileExcel,
} from "react-bootstrap-icons";

const StageData = ({ stage, stages, setStages }) => {
  const [branchSettingsVisible, setBranchSettingsVisible] = useState(false);

  const handleSettingsClick = (e) => {
    e.preventDefault();
    setBranchSettingsVisible(true);
  };

  return (
    <div>
      <div className="card-text stage-branch ps-1 text-center">
        <div className="row stage-info-branch">
          <div className="row">
            <div className="col card-info-key text-start">Stage Branch: </div>
            <div className="col line-2 stage-info text-start">
              {" "}
              {stage.stageBranch !== "undefined" ? (
                <>
                  <div className="col">
                    <a
                      target="_blank"
                      className="branch text-white px-1"
                      rel="noopener noreferrer"
                      href="/"
                      onClick={handleSettingsClick}
                    >
                      <i
                        aria-hidden="true"
                        className="fa fa-code-fork bg-1h"
                      ></i>
                      {stage.stageBranch}
                    </a>
                  </div>
                </>
              ) : (
                <span>N/A</span>
              )}
            </div>
            <div className="col">
              <a
                target="_blank"
                className="branch stage-info text-white px-1"
                rel="noopener noreferrer"
                href="/"
                onClick={handleSettingsClick}
              >
                settings
              </a>
            </div>
          </div>
          <div className="row text-start">
            <div
              target="_blank"
              className="row commit stage-info"
              rel="noopener noreferrer"
              href={stage.stageId}
            >
              <div className="col col-auto">
                <p className="card-info-key">Last Deployed: </p>
              </div>
              <div className="col">
                <p className="card-info-value">
                  {stage.lastDeploymentTime
                    ? String(new Date(stage.lastDeploymentTime))
                    : "Not Deployed"}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row text-start">
              <div className="col col-auto">
                <p className="card-info-key">Commit ID: </p>
              </div>
              <div className="col">
                <p className="stage-info-value">
                  {stage.lastCommitId ? (
                    <CommitId value={stage.lastCommitId} />
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        {stage.stageState === "created" && (
          <div className="row">
            <div className="col text-center">
              <FileEarmarkBinary color="yellow" className="mt-2" size={38} />
              <p>created</p>
            </div>
          </div>
        )}
        {stage.stageState === "deployed" && (
          <div className="col text-center">
            {" "}
            <CloudCheck color="lightgreen" className="mt-2" size={38} />
            <p>Deployed</p>
          </div>
        )}
        {(stage.stageState === "deploying" ||
          stage.stageState === "tearingDown") && (
          <div className="col">
            <Gear
              className="text-center text-transparent spinner-border"
              color="white"
              size={38}
            />
            <p>Deploying</p>
          </div>
        )}
        {stage.stageState === "error" && (
          <div className="col text-center mt-2">
            {" "}
            <ExclamationCircle color="red" size={38} />
            <p>Error</p>
          </div>
        )}
        {stage.stageState === "removed" && (
          <div className="col text-center mt-2">
            {" "}
            <FileExcel color="red" size={38} />
            <p>Removed</p>
          </div>
        )}
        {branchSettingsVisible ? (
          <BranchSettings
            stage={stage}
            setBranchSettingsVisible={setBranchSettingsVisible}
            stages={stages}
            setStages={setStages}
          />
        ) : null}
      </div>
    </div>
  );
};

export default StageData;
