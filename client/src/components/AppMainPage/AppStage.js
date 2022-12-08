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
    const stagingStageId = stages.find((s) => s.stageName === "staging").stageId;
    await APICalls.promoteStage({
      targetStageId: stage.stageName === 'staging' ? prodStageId : stagingStageId,
      userId,
      appId,
      sourceCommitId: stage.lastCommitId,
    });
    const data = await APICalls.getStages(appId);
    setStages(data);
  };

  return (
        <div key={stage.stageId} className="row stage-row m-1 py-1 pb-2 px-2">
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
            {stage.stageName !== "prod" && stage.stageName !== "staging" ? (
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
                    stages.find((s) => s.stageName === "staging").stageState !==
                      "deploying" &&
                    stages.find((s) => s.stageName === "staging").stageState !==
                      "tearingDown"
                      ? false
                      : true
                  }
                  size="sm"
                  variant="primary"
                  onClick={handlePromoteClick}
                >
                  Promote to Staging
                </Button>
              </>
            ) : stage.stageName === 'staging' ? (
              <>
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
            ) : 
            <div>
              <b />
              <b />
              <b />
              <span />
            </div>}
          </div>
        </div>
  );
};

export default AppStage;
