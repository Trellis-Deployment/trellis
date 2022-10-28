import handler from "../util/templates/handler";
import getDataForManualDeployment from "../util/deployment/getDataForManualDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import githubCalls from "util/github/githubCalls";
import createDeployment from "../util/deploymentsTableUtils/createDeployment";

export const main = handler(async (event) => {
  const { userId, appName, stageId } = JSON.parse(event.body);
  const { stage, token, user, stageName, repoName, IAMAccessKey, IAMSecretKey } = await getDataForManualDeployment({ userId, appName, stageId });
  const commits = await githubCalls.getCommits({ token, userLogin: user, repo: repoName });
  const deployment = await createDeployment({stageId: stage.stageId, commitId: commits[0].sha});

  try {
    const data = {
      AWS_ACCESS_KEY_ID: IAMAccessKey, 
      AWS_SECRET_ACCESS_KEY: IAMSecretKey,
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: user,
      GITHUB_REPO: repoName,
      STAGE_NAME: stageName,
      SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
      APP_NAME: appName,
      DEPLOYMENT_ID: deployment.deploymentId,
    };
    
    console.log(data);
    await invokeBuildFunction(data, stage, commits[0].sha);
    return "success";
  } catch(e) {
    console.log(e.message);
    return e.message;
  }
});