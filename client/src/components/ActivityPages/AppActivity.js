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
    <div className="container pipes mt-3 mid-card lips">
              <div className="row">
  <div className="col pipeline-title mt-1">
    Activity</div></div>
    <div className="col m-0">
      
    <div className="px-2 align-items-center">{stages.map(stage => (
        <StageDeploymentCard key={stage.stageId} stage={stage}></StageDeploymentCard>
      ))}</div>
    </div>
  </div>
  )
}

export default AppActivity;