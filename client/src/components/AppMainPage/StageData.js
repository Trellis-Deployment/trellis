import "../../App.css";
import "../../stylesheets/AppStage.css";
import { useState } from "react";
import BranchSettings from "./BranchSettings";
import TeardownModal from "./TeardownModal";
import CommitId from "./CommitId";
import { Col, Row } from "react-bootstrap";

import { CloudCheck, ExclamationCircle, Gear } from "react-bootstrap-icons";

const StageData = ({ stage, stages, setStages }) => {
  const [branchSettingsVisible, setBranchSettingsVisible] = useState(false);
  const [teardownVisible, setTeardownVisible] = useState(false);

  const handleSettingsClick = (e) => {
    e.preventDefault();
    setBranchSettingsVisible(true);
  };

  const handleTeardownClick = (e) => {
    e.preventDefault();
    setTeardownVisible(true);
  }

  return (
    <>
      <Row className="line-2 stage-info">
        {" "}
        {stage.stageBranch !== "undefined" ? (
          <>
            <Col>
              <a
                target="_blank"
                className="branch text-white px-1"
                rel="noopener noreferrer"
                href="/"
                onClick={handleSettingsClick}
              >
                <i aria-hidden="true" className="fa  fa-code-fork bg-1h"></i>
                {stage.stageBranch}
              </a>
            </Col>
          </>
        ) : (
          <span>N/A</span>
        )}
        <Col>
          <a
            target="_blank"
            className="branch text-white px-1"
            rel="noopener noreferrer"
            href="/"
            onClick={handleSettingsClick}
          >
            settings
          </a>
        </Col>
        <Row>
          <span
            target="_blank"
            className="commit ps-1 stage-info"
            rel="noopener noreferrer"
            href={stage.stageId}
          >
            <strong>Last Deployed: </strong>
            {stage.lastDeploymentTime
              ? String(new Date(stage.lastDeploymentTime))
              : "Not Deployed"}
          </span>
          <span className="text-center app-id">
            Commit ID:{" "}
            {stage.lastCommitId ? (
              <CommitId value={stage.lastCommitId} />
            ) : (
              "N/A"
            )}
          </span>
          {
            stage.stageState !== 'created' && stage.stageState !== 'tearingDown' && stage.stageState !== 'deploying' ? 
            <span><a href="/" onClick={handleTeardownClick}>Teardown</a></span> :
            null
          }
        </Row>
      </Row>
      {stage.stageState === "created" && (
        <Row>
          <Col className="text-center">
            <CloudCheck color="yellow" className="my-2" size={28} />
          </Col>
        </Row>
      )}
      {stage.stageState === "deployed" && (
        <Col className="text-center">
          {" "}
          <CloudCheck color="green" className="my-2" size={28} />
        </Col>
      )}
      {(stage.stageState === "deploying" || stage.stageState === "tearingDown") && (
        <Col>
          <Gear
            className="text-center text-light spinner-border"
            color="dark"
            size={29}
          />
        </Col>
      )}
      {stage.stageState === "error" && (
        <Col className="text-center my-2">
          {" "}
          <ExclamationCircle color="red" size={28} />
        </Col>
      )}
      {
        branchSettingsVisible ? <BranchSettings stage={stage} setBranchSettingsVisible={setBranchSettingsVisible} stages={stages} setStages={setStages}/> : null
      }
      {
        teardownVisible ? <TeardownModal stage={stage} setTeardownVisible={setTeardownVisible} stages={stages} setStages={setStages}/> : null
      }
    </>
  );
};

export default StageData;
