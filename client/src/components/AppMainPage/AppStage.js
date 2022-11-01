import "../../stylesheets/AppStage.css";
import { Col, Card, Row } from "react-bootstrap";
import { useEffect, useRef } from "react";
import APICalls from "../../services/APICalls";
import StageData from "./StageData";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Lib/AppContext";
import { CartDash } from "react-bootstrap-icons";

const AppStage = ({ stage, setStages, stages }) => {
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
    const prodStageId = stages.find((s) => s.stageName === "prod").stageId;
    await APICalls.promoteStage({
      targetStageId: prodStageId,
      userId,
      appName,
      sourceCommitId: stage.lastCommitId,
    });
    const data = await APICalls.getStages(appId);
    setStages(data);
  };

  const callNewInterval = async () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const duration = stage.state === "deploying" ? 10000 : 20000;

    const id = setInterval(async () => {
      const data = await APICalls.getStageStatus(stage);
      if (data.state === stage.stageState) {
        return;
      }

      setStages(
        stages.map((s) =>
          s.stageId === stage.stageId
            ? { ...s, stageState: data.state, lastCommitId: data.lastCommitId }
            : s
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
    <Col key={stage.stageId} className="stage-row m-1 py-1 pb-2">
      <Card.Title className="SectionHeader text-center">
        Stage Name:{" "}
        <Link to={`/application/${appName}/activity`} className="links">
          {stage.stageName}
        </Link>
      </Card.Title>

      <Card.Text className="stage-branch ps-1">
        <Row className="stage-info-branch">
          Stage Branch:{" "}
          <Col>
          {/* going to stage data */}
            {
              <StageData
                stage={stage}
                stages={stages}
                setStages={setStages}
              ></StageData>
            }
          </Col>
        </Row>
      </Card.Text>
      <Row>
        <div className="d-flex">
          {stage.stageName !== "prod" ? (
            <>
              {" "}
              <Button
                size="sm"
                variant="success"
                onClick={(e) => handleDeployClick(e, stage.stageId)}
              >
                Manually Deploy Stage
              </Button>
              <Button
                disabled={
                  stage.stageState === "deployed" &&
                  stages.find((s) => s.stageName === "prod").stageState !==
                    "deploying"
                    ? false
                    : true
                }
                size="sm"
                variant="success"
                onClick={handlePromoteClick}
              >
                Promote to Production
              </Button>
            </>
          ) : null}
        </div>
      </Row>
    </Col>
  );
};

export default AppStage;
