import { useState } from 'react';
import BranchSettings from './BranchSettings';
import CommitId from './CommitId';
import { Col, Row } from "react-bootstrap";
import "../../App.css";

import {
  CloudCheck,
  ExclamationCircle,
  Gear,
} from "react-bootstrap-icons";

const StageData = ({ stage, stages, setStages }) => {
  const [branchSettingsVisible, setBranchSettingsVisible] = useState(false)

  const handleBranchNameClick = (e) => {
    e.preventDefault();
    setBranchSettingsVisible(true);
  }

  return (
    <div className="stage-info">
      <Row>
        {" "}
        <div className="line-2">
        { stage.stageBranch !== 'undefined' ? 
        <>
          <a
            target="_blank"
            className="branch px-1"
            rel="noopener noreferrer"
            href="/"
            onClick={handleBranchNameClick}
          >
            <i aria-hidden="true" className="fa  fa-code-fork "></i>
            {stage.stageBranch}
          </a>
          </> :
          <span>N/A</span>
        }
          <Row>
            <span
              target="_blank"
              className="commit ps-1 stage-info"
              rel="noopener noreferrer"
              href={stage.stageId}
            >
              Last Deployed: {stage.lastDeploymentTime ? String(new Date(stage.lastDeploymentTime)) : "Not Deployed"}
            </span>
              <span>Commit ID: {stage.lastCommitId ? <CommitId value={stage.lastCommitId} /> : "N/A"}</span>
          </Row>
        </div>
      </Row>
      {stage.stageStage === "created" && (
        <Col className="text-center">
          <CloudCheck color="yellow" size={28} />
        </Col>
      )}
      {stage.stageState === "deployed" && (
        <Col className="text-center">
          {" "}
          <CloudCheck color="green" size={28} />
        </Col>
      )}
      {stage.stageState === "deploying" && (
        <Col>
          <Gear
            className="text-center text-light spinner-border"
            color="dark"
            size={29}
          />
        </Col>
      )}
      {stage.stageState === "error" && (
        <Col className="text-center">
          {" "}
          <ExclamationCircle color="red" size={28} />
        </Col>
      )}

      {
        branchSettingsVisible ? <BranchSettings stage={stage} setBranchSettingsVisible={setBranchSettingsVisible} stages={stages} setStages={setStages}/> : null
      }
    </div>
  );
};

export default StageData;
