import handler from "../util/templates/handler";
import getStagesByAppId from "util/stagesTableUtils/getStagesByAppId";
import getDeploymentsByStageId from "util/deploymentsTableUtils/getDeploymentsByStageId";
import deleteApp from "../util/appsTableUtils/deleteApp";
import deleteStage from "util/stagesTableUtils/deleteStage";
import getAppByAppId from "util/appsTableUtils/getAppByAppId";
import getTokenByUserId from "../util/usersTableUtils/getTokenByUserId";
import githubCalls from "util/github/githubCalls";

export const main = handler(async (event) => {
  const appId = await event['pathParameters']['appId'];
  try {
    const stages = await getStagesByAppId(appId);
    let stagesToBeTornDown = [];
    for (const stage of stages) {
      if (stage.stageState === "deployed" || stage.stageState === "deploying") {
        stagesToBeTornDown.push(stage.stageName);
      } else if (stage.stageState === "error") {
        const deployments = await getDeploymentsByStageId(stage.stageId);
        let valid = true;
        for (const deployment of deployments) {
          if (deployment.deploymentState === 'removed') {
            break;
          } else if (deployment.deploymentState === 'deployed') {
            valid = false;
            break;
          }
        }
        if (!valid) {
          stagesToBeTornDown.push(stage.stageName);
        }
      }
    }
    if (stagesToBeTornDown.length === 0) {
      try {
        let deletePromises = [];
        stages.forEach(stage => deletePromises.push(deleteStage(stage.stageId)));
        const app = await getAppByAppId(appId);
        if (app.hookId) {
          const token = await getTokenByUserId(app.userId);
          deletePromises.push(githubCalls.deleteWebhook(token, app.repoName, app.hookId));
        }
        deletePromises.push(deleteApp(app.userId, appId));
        await Promise.all(deletePromises);
        return("success");
      } catch(e) {
        console.log(e.message);
        throw e;
      }
    } else {
      return{error: `Please tear down these stages and then try again: ${stagesToBeTornDown.join(",")}`}
    }
  } catch(e) {
    console.log(e.message);
    throw e;
  }

});