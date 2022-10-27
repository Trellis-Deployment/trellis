import "../../stylesheets/AppModal.css";
import { Col, Card, Row } from "react-bootstrap";
import { useEffect, useRef } from "react";
import APICalls from "../../services/APICalls";
import Stages from "./Stages";

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
    <Col key={stage.stageId} className="stage-row">
      <Card.Title className="SectionHeader">
        Stage Name: {stage.stageName}
      </Card.Title>
      <Card.Text className="stage-branch">
        <Row>
          Stage Branch:{" "}
          {stage.stageBranch !== "undefined" ? stage.stageBranch : "no branch"}{" "}
          <Col className="lh-0">{<Stages stage={stage} />}</Col>
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
