import "../../stylesheets/AppStage.css";
import { Col, Card, Row } from "react-bootstrap";
import APICalls from "../../services/APICalls";
import StageData from "./StageData";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Lib/AppContext";

const AppStage = ({ stage, setStages, stages }) => {
  const { appName, userId, appId } = useAppContext();

  const handleDeployClick = async (e, stageId) => {
    e.preventDefault();
    await APICalls.buildStage({ userId, stageId, appId });
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
      appId,
      sourceCommitId: stage.lastCommitId,
    });
    const data = await APICalls.getStages(appId);
    setStages(data);
  };

  return (
    <Col key={stage.stageId} className="stage-row m-1 py-1 pb-2">
      <Card.Title className="SectionHeader text-center">
        Stage Name:{" "}
        <Link to={`/application/${appName}/activity`} className="links">
          {stage.stageName}
        </Link>
      </Card.Title>
      <Row>
        {
          <StageData
            stage={stage}
            stages={stages}
            setStages={setStages}
          ></StageData>
        }
      </Row>
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
                  "deploying" &&
                stages.find((s) => s.stageName === "prod").stageState !==
                  "tearingDown"
                  ? false
                  : true
              }
              size="sm"
              variant="primary"
              onClick={handlePromoteClick}
            >
              Promote to Production
            </Button>
          </>
        ) : null}
      </div>
      
    </Col>
  );
};

export default AppStage;
