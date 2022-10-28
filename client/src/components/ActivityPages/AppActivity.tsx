import "../../stylesheets/AppStage.css";
import { useState, useEffect } from "react";
import DeploymentCard from "./DeploymentCard";

const AppActivity = () => {
  const [deployments, setDeployments] = useState([
    {
      deploymentId: "sfjfkj3jkjsf3",
      stageId: "sdfklkj38923",
      commitId: "3456",
      logs: "Very Long String",
      deploymentState: "deployed",
      time: "349898s98998",
    },
    {
      deploymentId: "sfjfkj3jkjsf",
      stageId: "sdfklkj38923",
      commitId: "3456",
      logs: "Very Long String",
      deploymentState: "deployed",
      time: "349898s98998",
    },
  ]);
  useEffect(() => {
    console.log(deployments);
  });

  return (
  <div className="card p-2 pipes container pipeline-title">
    Activity
    
    <div className="row border">
          <div className="col  bg-white">
            <div className="row ">
            {deployments.map(deployment => (
              <DeploymentCard key={deployment.deploymentId} deployment={deployment}></DeploymentCard>
            ))}
            </div>
            <div className="card mini-card">
            </div>
          </div>
        </div>
  </div>
  )
}

export default AppActivity;