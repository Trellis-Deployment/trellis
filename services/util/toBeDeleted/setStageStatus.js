import handler from "../util/templates/handler";
import getAppByUserAndAppName from "util/appsTableUtils/getAppByUserAndAppName";
import updateStageState from "util/stagesTableUtils/updateStageState";
import getUserByLogin from "util/usersTableUtils/getUserByLogin";
import getStageByAppIdAndStageName from "util/stagesTableUtils/getStageByAppIdAndStageName";
import updateDeploymentStateById from "util/deploymentsTableUtils/updateDeploymentStateById";
import getDeploymentById from "util/deploymentsTableUtils/getDeploymentById";
import getStagesByAppId from "../util/stagesTableUtils/getStagesByAppId";
import invokeWebSocketMessage from "util/deployment/invokeWebSocketMessage";

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;

  try {
    const user = await getUserByLogin(data.GITHUB_USER);
    const app = await getAppByUserAndAppName({ userId: user.userId, appName: data.APP_NAME });
    const stage = await getStageByAppIdAndStageName({ appId: app.appId, stageName: data.STAGE_NAME });
    const deploymentState = data.STATE === 'created' ? 'removed' : data.STATE;
    await updateDeploymentStateById({ deploymentId: data.DEPLOYMENT_ID, state: deploymentState, logs: data.LOGS });
    const deployment = await getDeploymentById(data.DEPLOYMENT_ID);
    const commitId = deployment.commitId || data.COMMIT_ID
    await updateStageState({ stage, state: data.STATE, commitId });
    const updatedStages = await getStagesByAppId(stage.appId);
    await invokeWebSocketMessage({ userId: user.userId, updatedStages });
    return "received";
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});
