import "../../stylesheets/AppStage.css";
import { Col, Card, Row } from "react-bootstrap";
import { useEffect, useRef } from "react";
import APICalls from "../../services/APICalls";
import Stages from "./StageData";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Lib/AppContext";

const Stage = ({ stage, setStages, stages }) => {
  const { appName, userId, appId } = useAppContext();
  const intervalId = useRef(0);
  const handleDeployClick = async (e, stageId) => {
    e.preventDefault();
    await APICalls.buildStage({ userId, appName, stageId });
    const data = await APICalls.getStages(appId);
    setStages(data);
  };

  //need to properly debounce this - when are promotions valid to do?
  const handlePromoteClick = async (e) => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    const prodStageId = stages.find((s) => s.stageName === "prod").stageId;
    console.log({
      targetStageId: prodStageId,
      userId,
      appName,
      sourceCommitId: stage.commitId,
    });
    await APICalls.promoteStage({
      targetStageId: prodStageId,
      userId,
      appName,
      sourceCommitId: stage.commitId,
    });
    const data = await APICalls.getStages(userId, appName);
    e.currentTarget.disabled = false;
    setStages(data);
  };

  const callNewInterval = async () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const duration = stage.state === "deploying" ? 15000 : 30000;

    const id = setInterval(async () => {
      console.log("poll");
      const data = await APICalls.getStageStatus(stage);
      if (data.state === stage.stageState) {
        return;
      }

      setStages(
        stages.map((s) =>
          s.stageId === stage.stageId ? { ...s, stageState: data.state } : s
        )
      );
    }, duration);
    console.log({ id });
    intervalId.current = id;
  };

  useEffect(() => {
    callNewInterval();
    return () => {
      console.log("cleared ", intervalId.current);
      clearInterval(intervalId.current);
    };
  }, [stage.stageState]);

  console.log({ stage });
  return (
    <Col key={stage.stageId} className="stage-row m-1">
      <Card.Title className="SectionHeader m-1">
        Stage Name:{" "}
        <Link to={`/application/${appName}/activity`}>{stage.stageName}</Link>
      </Card.Title>
      <Row  className="stage-branch ps-2">
        Stage Branch:{" "}
        {stage.stageBranch !== "undefined" ? stage.stageBranch : "no branch"}{" "}
        <Col className="lh-0">{<Stages stage={stage}></Stages>}</Col>
      </Row>
      <Row>
        <div className="d-flex">
          <Button
            size="sm"
            variant="success"
            onClick={(e) => handleDeployClick(e, stage.stageId)}
          >
            Manually Deploy Stage
          </Button>
          {stage.stageName !== "prod" ? (
            <Button
              disabled={stage.stageState === "deployed" ? false : true}
              size="sm"
              variant="success"
              onClick={handlePromoteClick}
            >
              Promote to Production
            </Button>
          ) : null}
        </div>
      </Row>
    </Col>
  );
};

export default Stage;
