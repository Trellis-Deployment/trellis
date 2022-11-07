import "../../App.css";
import "../../stylesheets/AppStage.css";
import { useState } from "react";
import BranchSettings from "./BranchSettings";
// import TeardownModal from "./TeardownModal";
import CommitId from "./CommitId";
import { Card, Col, Row } from "react-bootstrap";

import { CloudCheck, ExclamationCircle, FileEarmarkBinary, Gear, FileExcel } from "react-bootstrap-icons";

const StageData = ({ stage, stages, setStages }) => {
  const [branchSettingsVisible, setBranchSettingsVisible] = useState(false);

  const handleSettingsClick = (e) => {
    e.preventDefault();
    setBranchSettingsVisible(true);
  };

  return (
    <div>
      <Card.Text className="stage-branch ps-1 text-center">
        <Row>
          <Row></Row>
        </Row>
        <Row className="stage-info-branch">
          <Row>
            Stage Branch:{" "}
            <Col className="line-2 stage-info text-start">
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
                      <i
                        aria-hidden="true"
                        className="fa  fa-code-fork bg-1h"
                      ></i>
                      {stage.stageBranch}
                    </a>
                  </Col>
                </>
              ) : (
                <span>N/A</span>
              )}
            </Col>
            <Col>
              <a
                target="_blank"
                className="branch stage-info text-white px-1"
                rel="noopener noreferrer"
                href="/"
                onClick={handleSettingsClick}
              >
                settings
              </a>
            </Col>
          </Row>
          <Row>
            <span
              target="_blank"
              className="commit ps-1 stage-info text-start"
              rel="noopener noreferrer"
              href={stage.stageId}
            >
              <strong>Last Deployed: </strong>
              {stage.lastDeploymentTime
                ? String(new Date(stage.lastDeploymentTime))
                : "Not Deployed"}
            </span>
          </Row>
          <Row>
            <span className=" app-id stage-info">
              Commit ID:{" "}
              {stage.lastCommitId ? (
                <CommitId value={stage.lastCommitId} />
              ) : (
                "N/A"
              )}
            </span>
          </Row>
        </Row>
        {stage.stageState === "created" && (
          <Row>
            <Col className="text-center">
              <FileEarmarkBinary color="yellow" className="mt-2" size={38} />
              <p>created</p>
            </Col>
          </Row>
        )}
        {stage.stageState === "deployed" && (
          <Col className="text-center">
            {" "}
            <CloudCheck color="lightgreen" className="mt-2" size={38} />
            <p>Deployed</p>
          </Col>
        )}
        {(stage.stageState === "deploying" ||
          stage.stageState === "tearingDown") && (
          <Col>
            <Gear
              className="text-center text-transparent spinner-border"
              color="white"
              size={38}
            />
            <p>Deploying</p>
          </Col>
        )}
        {stage.stageState === "error" && (
          <Col className="text-center mt-2">
            {" "}
            <ExclamationCircle color="red" size={38} />
            <p>Error</p>
          </Col>
        )}
        {stage.stageState === "removed" && (
          <Col className="text-center mt-2">
          {" "}
          <FileExcel color="red" size={38} />
          <p>Removed</p>
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
      </Card.Text>
    </div>
  );
};

export default StageData;
