import handler from "../util/templates/handler";
import getDataForManualDeployment from "../util/deployment/getDataForManualDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import githubCalls from "util/github/githubCalls";
import createDeployment from "../util/deploymentsTableUtils/createDeployment";
import getStagesByAppId from "../util/stagesTableUtils/getStagesByAppId";
import invokeWebSocketMessage from "util/deployment/invokeWebSocketMessage";

export const main = handler(async (event) => {
  let { userId, appName, stageId, commitId } = JSON.parse(event.body);

  const { stage, token, user, stageName, repoName, IAMCredentialsLocation } =
    await getDataForManualDeployment({ userId, appName, stageId });

  if (!commitId) {
    const commits = await githubCalls.getCommits({
      token,
      userLogin: user,
      repo: repoName,
    });
    commitId = commits[0].sha;
  }

  const deployment = await createDeployment({
    stageId: stage.stageId,
    commitId,
  });

  try {
    const data = {
      AWS_SSM_KEY: IAMCredentialsLocation,
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: user,
      GITHUB_REPO: repoName,
      STAGE_NAME: stageName,
      SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
      APP_NAME: appName,
      DEPLOYMENT_ID: deployment.deploymentId,
      COMMIT_ID: commitId,
    };
    await invokeBuildFunction(data, stage, commitId);
    const updatedStages = await getStagesByAppId(stage.appId);
    await invokeWebSocketMessage({ userId, updatedStages });
    return "success";
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});
