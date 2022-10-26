import "../../stylesheets/AppModal.css";
import { Col, Card, Row } from "react-bootstrap"
import { useEffect, useState, useRef } from "react";
import APICalls from "../../services/APICalls";
import { CloudCheck, Code, ExclamationCircle, GearWideConnected } from "react-bootstrap-icons";

const Stage = ({ stage, authUser, appName, setStages, stages }) => {
  const intervalId = useRef(0);
  const handleDeployClick = async (e, stageName) => {
    e.preventDefault();
    await APICalls.buildStage({ authUser, appName, stageName });
    const data = await APICalls.getStages(authUser, appName);
    setStages(data);
  };
  
  const callNewInterval = async () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const duration = stage.state === 'deploying' ? 15000 : 30000;

    const id = setInterval(async () => {
      console.log('poll');
      const data = await APICalls.getStageStatus(stage);
      if (data.state === stage.stageState) {
        return;
      }

      setStages(stages.map((s) => s.stageId === stage.stageId ? ({...s, stageState: data.state}) : s));
    }, duration);
    console.log({id});
    intervalId.current = id;
  }
  useEffect(() => {
    callNewInterval();
    return (() => {
      console.log('cleared ', intervalId.current);
      clearInterval(intervalId.current);
    });
  }, [stage.stageState]);

  return (
    <Col key={stage.stageId} className="stage-row">
      <Card.Title className="SectionHeader">
        Stage Name: {stage.stageName}
      </Card.Title>
      <Card.Text className="stage-branch">
        <Row>
          Stage Branch:{" "}
          {stage.stageBranch !== "undefined"
            ? stage.stageBranch
            : "no branch"}{" "}
          <Col className="lh-0">
            {stage.stageBranch === "main" ? (
              <div className="row">
                <Row>
                  {" "}
                  <div className="line-2">
                    <a
                      target="_blank"
                      className="branch px-1"
                      rel="noopener noreferrer"
                      href="/"
                    >
                      <i
                        aria-hidden="true"
                        className="fa  fa-code-fork "
                      ></i>
                      main
                    </a>
                    <Row>
                      <a
                        target="_blank"
                        className="commit ps-1"
                        rel="noopener noreferrer"
                        href={stage.Id}
                      >
                        Stage ID: {stage.stageId.split('-')[0]}
                      </a>
                      App ID: {stage.appId.split('-')[0]}
                    </Row>
                  </div>
                </Row>
                {stage.stageStage ==='created' && <Col className="text-center"> <CloudCheck color="yellow" size={28}/></Col>}
                {stage.stageState === 'deployed' && <Col className="text-center"> <CloudCheck color="green" size={28}/></Col>}
                {stage.stageState === 'deploying' && <div className="spinner-border gear"><GearWideConnected color="grey" className="text-center" size={29} /></div>}
                {stage.stageState === 'error' && <Col className="text-center"> <ExclamationCircle color="red" size={28} /></Col>}
              </div>
            ) : (
              <div>
                -{" "}
                <Col>
                  {" "}
                  <Code color="grey" size={28} />
                </Col>
              </div>
            )}
          </Col>
        </Row>
      </Card.Text>

      <Row>
        <button
          className="btn btn-sm px-1 color-success"
          type="button"
          onClick={(e) => handleDeployClick(e, stage.stageName)}
        >
          Manually Deploy Stage
        </button>
      </Row>
    </Col>
  );
};

export default Stage;