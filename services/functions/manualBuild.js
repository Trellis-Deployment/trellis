import handler from "../util/templates/handler";
import getDataForManualDeployment from "../util/deployment/getDataForManualDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import githubCalls from "util/github/githubCalls";
import createDeployment from "../util/deploymentsTableUtils/createDeployment";
import getStagesByAppId from "../util/stagesTableUtils/getStagesByAppId";
import invokeWebSocketMessage from "util/deployment/invokeWebSocketMessage";

export const main = handler(async (event) => {
  let { userId, appId, stageId, commitId } = JSON.parse(event.body);
  const { stage, token, user, stageName, repoName, IAMCredentialsLocation, appName } = await getDataForManualDeployment({ userId, appId, stageId });
  if (!commitId) {
    const lastCommit = await githubCalls.getLastBranchCommit({
      token,
      userLogin: user,
      repo: repoName,
      branch: stage.stageBranch,
    });
    commitId = lastCommit.sha;
  }

  const deployment = await createDeployment({
    stageId: stage.stageId,
    commitId,
  });

  try {
    const data = {
      AWS_SSM_KEY: IAMCredentialsLocation,
      AWS_SSM_ENV: stage.envLocation,
      ACTION: "deploy",
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: user,
      GITHUB_REPO: repoName,
      STAGE_NAME: stageName,
      APP_NAME: appName,
      DEPLOYMENT_ID: deployment.deploymentId,
      COMMIT_ID: commitId,
      NPM_SCRIPT_NAME: stage.npmScriptName,
      IS_UNIT_TEST_REQUIRED: String(stage.isUnitTestRequired),
      
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
