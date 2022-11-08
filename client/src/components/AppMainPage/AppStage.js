import "../../stylesheets/AppStage.css";
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
    <>
      {stage.stageName === "prod" ? (
        <div key={stage.stageId} className="row stage-row m-1 py-1 pb-2">
          <div className="card-title SectionHeader text-center">
            Stage Name:{" "}
            <Link to={`/application/${appName}/activity`} className="links">
              {stage.stageName}
            </Link>
          </div>
          <div className="row">
            {
              <StageData
                stage={stage}
                stages={stages}
                setStages={setStages}
              ></StageData>
            }
          </div>
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
        </div>
      ) : (
        <div key={stage.stageId} className="col stage-row m-1 py-1 pb-2">
          <div className="card-titleSectionHeader text-center">
            Stage Name:{" "}
            <Link to={`/application/${appName}/activity`} className="links">
              {stage.stageName}
            </Link>
          </div>
          <div className="row">
            {
              <StageData
                stage={stage}
                stages={stages}
                setStages={setStages}
              ></StageData>
            }
          </div>
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
        </div>
      )}
    </>
  );
};

export default AppStage;
