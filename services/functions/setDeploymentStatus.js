import handler from "../util/templates/handler";
import getAppByUserAndAppName from "util/appsTableUtils/getAppByUserAndAppName";
import updateStageState from "util/stagesTableUtils/updateStageState";
import getUserByLogin from "util/usersTableUtils/getUserByLogin";
import getStageByAppIdAndStageName from "util/stagesTableUtils/getStageByAppIdAndStageName";
import updateDeploymentStateById from "util/deploymentsTableUtils/updateDeploymentStateById";
import getDeploymentById from "util/deploymentsTableUtils/getDeploymentById";

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;
  console.log({ data });
  try {
    const user = await getUserByLogin(data.GITHUB_USER);
    console.log({user});
    const app = await getAppByUserAndAppName({ userId: user.userId, appName: data.APP_NAME });
    console.log({app});
    const stage = await getStageByAppIdAndStageName({ appId: app.appId, stageName: data.STAGE_NAME });
    await updateDeploymentStateById({ deploymentId: data.DEPLOYMENT_ID, state: data.STATE, logs: data.LOGS });
    const deployment = await getDeploymentById(data.DEPLOYMENT_ID);

    console.log({deployment});
    await updateStageState({ stage, state: data.STATE, commitId: deployment.commitId });
    return "received";
  } catch(e) {
    console.log(e.message);
    return e.message;
  }
});