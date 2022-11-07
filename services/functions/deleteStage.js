import handler from "../util/templates/handler";
import deleteStage from "../util/stagesTableUtils/deleteStage";
import getStageById from "util/stagesTableUtils/getStageById";

export const main = handler(async (event) => {
  const stageId = await event['pathParameters']['stageId'];
  try {
    const stage = await getStageById(stageId);
    if (stage.stageState === "deployed" || stage.stageState === "deploying") {
      return{error: `Please tear down this stage before deleting`}
    } else if (stage.stageState === "error") {
      const deployments = await getDeploymentsByStageId(stage.stageId);
      let valid = true;
      let deployedDeployment;
      for (const deployment of deployments) {
        if (deployment.deploymentState === 'removed') {
          break;
        } else if (deployment.deploymentState === 'deployed') {
          valid = false;
          deployedDeployment = deployment;
          break;
        }
      }
      if (!valid) {
        return{error: `Please roll back to commit ${deployedDeployment.commitId} and then tear it down before deleting`}
      }
    } else {
      const data = await deleteStage(stageId);
      return(data);
    }
  } catch(e) {
    console.log(e.message);
    throw e;
  }
});