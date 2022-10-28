import handler from "../util/templates/handler";
import getDataForManualDeployment from "../util/deployment/getDataForManualDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";

export const main = handler(async (event) => {
  const { userId, appName, stageId } = JSON.parse(event.body);
  const { stage, token, user, stageName, repoName, IAMAccessKey, IAMSecretKey } = await getDataForManualDeployment({ userId, appName, stageId });
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
    };
    
    console.log(data);
    await invokeBuildFunction(data, stage);
    return "success";
  } catch(e) {
    console.log(e.message);
    return e.message;
  }
});