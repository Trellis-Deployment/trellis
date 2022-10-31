import handler from "../util/templates/handler";
import getDataForAutoDeployment from "../util/deployment/getDataForAutoDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import createDeployment from "util/deploymentsTableUtils/createDeployment";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  console.log({data});
  const commitId = data.after;
  const refArray = (data.ref.split("/"));
  let branch = refArray[refArray.length - 1];
  const repoName = data.repository["full_name"];
  
  try {
    const { stage, appName, stageName, token, IAMAccessKey, IAMSecretKey } = await getDataForAutoDeployment({ repoName, branch });
    
    if (!stage) {
      return
    }

    const deployment = await createDeployment({stageId: stage.stageId, commitId });

    const buildData = {
      AWS_ACCESS_KEY_ID: IAMAccessKey,
      AWS_SECRET_ACCESS_KEY: IAMSecretKey,
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: repoName.split("/")[0],
      GITHUB_REPO: repoName.split("/")[1],
      STAGE_NAME: stageName,
      BRANCH_NAME: stage.stageBranch,
      SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
      APP_NAME: appName,
      DEPLOYMENT_ID: deployment.deploymentId,
    }

    await invokeBuildFunction(buildData, stage, commitId);
    return "success";
  } catch(e) {
    console.log(e.message);
    return e.message;
  }
});
