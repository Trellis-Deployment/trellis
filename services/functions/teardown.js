import handler from "../util/templates/handler";
import getDataForManualDeployment from "../util/deployment/getDataForManualDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import createDeployment from "util/deploymentsTableUtils/createDeployment";
import githubCalls from "util/github/githubCalls";
import invokeWebSocketMessage from "util/deployment/invokeWebSocketMessage";
import getStagesByAppId from "util/stagesTableUtils/getStagesByAppId";
export const main = handler(async (event) => {
  let { userId, appId, stageId, commitId } = JSON.parse(event.body);
  const { stage, token, user, stageName, repoName, IAMCredentialsLocation, appName } = await getDataForManualDeployment({ userId, appId, stageId });

  if (!commitId) {
    const lastCommit = await githubCalls.getLastBranchCommit({ token, userLogin: user, repo: repoName, branch: stage.stageBranch });
    commitId = lastCommit.sha;
  }

  const deployment = await createDeployment ({ stageId, commitId, state: 'tearingDown' })

  try {
    const data = {
      AWS_SSM_KEY: IAMCredentialsLocation,
      ACTION: 'teardown',
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: user,
      GITHUB_REPO: repoName,
      STAGE_NAME: stageName,
      SET_STATUS_URL: `https://${event.headers.host}/stageStatus`,
      APP_NAME: appName,
      DEPLOYMENT_ID: deployment.deploymentId,
      COMMIT_ID: commitId,
    };
    
    await invokeBuildFunction(data, stage, commitId);
    const updatedStages = await getStagesByAppId(stage.appId);
    await invokeWebSocketMessage({ userId, updatedStages });
    return JSON.stringify({ stageState: 'tearingDown' });
  } catch(e) {
    console.log(e.message);
    return e.message;
  }
});