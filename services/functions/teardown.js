import handler from "../util/templates/handler";
import getDataForManualDeployment from "../util/deployment/getDataForManualDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import createDeployment from "util/deploymentsTableUtils/createDeployment";
import githubCalls from "util/github/githubCalls";

export const main = handler(async (event) => {
  let { userId, appName, stageId, commitId } = JSON.parse(event.body);
  const { stage, token, user, stageName, repoName, IAMAccessKey, IAMSecretKey } = await getDataForManualDeployment({ userId, appName, stageId });

  if (!commitId) {
    const lastCommit = await githubCalls.getLastBranchCommit({ token, userLogin: user, repo: repoName, branch: stage.stageBranch });
    commitId = lastCommit.sha;
  }

  const deployment = await createDeployment ({ stageId, commitId, state: 'tearingDown' })

  try {
    const data = {
      ACTION: 'teardown',
      AWS_ACCESS_KEY_ID: IAMAccessKey, 
      AWS_SECRET_ACCESS_KEY: IAMSecretKey,
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
    return JSON.stringify({ stageState: 'tearingDown' });
  } catch(e) {
    console.log(e.message);
    return e.message;
  }
});