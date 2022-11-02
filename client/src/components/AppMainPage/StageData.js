import "../../App.css";
import "../../stylesheets/AppStage.css";
import { useState } from "react";
import BranchSettings from "./BranchSettings";
import CommitId from "./CommitId";
import { Col, Row } from "react-bootstrap";

import {
  CloudCheck,
  ExclamationCircle,
  Gear,
} from "react-bootstrap-icons";

const StageData = ({ stage, stages, setStages }) => {
  const [branchSettingsVisible, setBranchSettingsVisible] = useState(false);

  const handleBranchNameClick = (e) => {
    e.preventDefault();
    setBranchSettingsVisible(true);
  };

  return (
    <>
      <Row className="line-2 stage-info">
        {" "}
        {stage.stageBranch !== "undefined" ? (
          <Col>
            <a
              target="_blank"
              className="branch text-white px-1"
              rel="noopener noreferrer"
              href="/"
              onClick={handleBranchNameClick}
            >
              <i aria-hidden="true" className="fa  fa-code-fork bg-1h"></i>
              {stage.stageBranch}
            </a>
          </Col>
        ) : (
          <span>N/A</span>
        )}
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
        </Row>
      </Row>

      {stage.stageStage === "created" && (
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
      {stage.stageState === "deploying" && (
        <Row>
          <Col className="text-center py-1">
            <Gear className="spinner-border my-2" color="white" size={29} />
          </Col>
        </Row>
      )}
      {stage.stageState === "error" && (
        <Col className="text-center my-2">
          {" "}
          <ExclamationCircle color="red" size={28} />
        </Col>
      )}

      {branchSettingsVisible ? (
        <BranchSettings
          stage={stage}
          setBranchSettingsVisible={setBranchSettingsVisible}
          stages={stages}
          setStages={setStages}
        />
      ) : null}
    </>
  );
};

export default StageData;
