import "../../App.css";
import "../../stylesheets/AppStage.css";
import { useState } from "react";
import BranchSettings from "./BranchSettings";
import TeardownModal from "./TeardownModal";
import CommitId from "./CommitId";
import { Card, Col, Row } from "react-bootstrap";

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
  };

  return (
    <div>
      <Card.Text className="stage-branch ps-1 text-center">
        <Row>
        <Row>
      </Row>
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
          <Row></Row>
          {/* <div class="dropdown mt-3">
                <button  class="btn btn-secondary dropdown-toggle"
            type="button"
            id="book-dropdown" data-bs-toggle="drowdown">
              choose book
              <ul className="dropdown-menu" aria-labelledby="book-dropdown">
                <li href="#" class="dropdown-item">sky blue</li>
              </ul>
                </button>
          </div> */}
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
          <Row className="text-center">
            {stage.stageState !== "created" &&
            stage.stageState !== "tearingDown" &&
            stage.stageState !== "deploying" ? (
              <span>
                <a
                  href="/"
                  onClick={handleTeardownClick}
                  className="stage-info-branch"
                >
                  Teardown
                </a>
              </span>
            ) : null}
          </Row>
        </Row>
        {stage.stageState === "created" && (
          <Row>
            <Col className="text-center">
              <CloudCheck color="yellow" className="my-2" size={38} />
            </Col>
          </Row>
        )}
        {stage.stageState === "deployed" && (
          <Col className="text-center">
            {" "}
            <CloudCheck color="green" className="my-2" size={38} />
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
          </Col>
        )}
        {stage.stageState === "error" && (
          <Col className="text-center my-2">
            {" "}
            <ExclamationCircle color="red" size={38} />
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
        {teardownVisible ? (
          <TeardownModal
            stage={stage}
            setTeardownVisible={setTeardownVisible}
            stages={stages}
            setStages={setStages}
          />
        ) : null}
      </Card.Text>
    </div>
  );
};

export default StageData;
