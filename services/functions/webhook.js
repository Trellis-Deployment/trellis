import handler from "../util/templates/handler";
import getDataForAutoDeployment from "../util/deployment/getDataForAutoDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import createDeployment from "util/deploymentsTableUtils/createDeployment";
import getStagesByAppId from "../util/stagesTableUtils/getStagesByAppId";
import invokeWebSocketMessage from "util/deployment/invokeWebSocketMessage";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const commitId = data.after;
  const refArray = data.ref.split("/");
  let branch = refArray[refArray.length - 1];
  const repoName = data.repository["full_name"];

  try {
    const { userId, stage, appName, stageName, token } =
      await getDataForAutoDeployment({ repoName, branch });
    if (!stage) {
      return;
    }
    const deployment = await createDeployment({
      stageId: stage.stageId,
      commitId,
    });
    const buildData = {
      AWS_SSM_KEY: stage.IAMCredentialsLocation,
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: repoName.split("/")[0],
      GITHUB_REPO: repoName.split("/")[1],
      STAGE_NAME: stageName,
      BRANCH_NAME: stage.stageBranch,
      SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
      APP_NAME: appName,
      DEPLOYMENT_ID: deployment.deploymentId,
      COMMIT_ID: commitId,
    };

    console.log({ buildData });
    await invokeBuildFunction(buildData, stage, commitId);
    const updatedStages = await getStagesByAppId(stage.appId);
    await invokeWebSocketMessage({ userId, updatedStages });
    return "success";
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});
