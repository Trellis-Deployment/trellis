import handler from "../util/templates/handler";
import getDeploymentsByStageId from "../util/deploymentsTableUtils/getDeploymentsByStageId";


export const main = handler(async (event) => {
  const stageId = await event['queryStringParameters']['stageId'];
  try {
    const deployments = await getDeploymentsByStageId(stageId);
    deployments.sort((a, b) => {
      if (a.deploymentState === 'deploying') {
        return -1;
      } else if (b.deploymentState === 'deploying') {
        return 1;
      }
      return b.deployedTime - a.deployedTime
    });
    return(deployments);
  } catch(e) {
    console.log(e.message);
    return(e.message);
  }
});