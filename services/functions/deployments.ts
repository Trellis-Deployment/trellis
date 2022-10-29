import handler from "../util/templates/handler";
import getDeploymentsByStageId from "../util/deploymentsTableUtils/getDeploymentsByStageId";


export const main = handler(async (event) => {
  const stageId = await event['queryStringParameters']['stageId'];
  try {
    const deployments = await getDeploymentsByStageId(stageId);
    return(deployments);
  } catch(e) {
    console.log(e.message);
    return(e.message);
  }
});