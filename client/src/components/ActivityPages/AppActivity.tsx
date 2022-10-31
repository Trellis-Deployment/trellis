import "../../stylesheets/AppStage.css";
import { useState, useEffect } from "react";
import StageDeploymentCard from "./StageDeploymentCard";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";

const AppActivity = () => {
  const [stages, setStages] = useState([]);
  // const [deployments, setDeployments] = useState([
  //   {
  //     deploymentId: "sfjfkj3jkjsf3",
  //     stageId: "sdfklkj38923",
  //     commitId: "3456",
  //     logs: "Very Long String",
  //     deploymentState: "deployed",
  //     time: "349898s98998",
  //   },
  //   {
  //     deploymentId: "sfjfkj3jkjsf",
  //     stageId: "sdfklkj38923",
  //     commitId: "3456",
  //     logs: "Very Long String",
  //     deploymentState: "deployed",
  //     time: "349898s98998",
  //   },
  // ]);

  const { appId } = useAppContext();
  useEffect(() => {
     const getStages = async () => {
      const data = await APICalls.getStages(appId);
      setStages(data);
    };

    getStages();
  }, [appId]);

  return (
  <div className="pipes pipeline-title">
    Activity
    <div className="bg-white row">
      {stages.map(stage => (
        <StageDeploymentCard key={stage.stageId} stage={stage}></StageDeploymentCard>
      ))}
    </div>
  </div>
  )
}

export default AppActivity;