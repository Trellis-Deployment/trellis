import handler from "../util/templates/handler";
import getDataForAutoDeployment from "../util/deployment/getDataForAutoDeployment";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const refArray = (data.ref.split("/"));
  let branch = refArray[refArray.length - 1];
  const repoName = data.repository["full_name"];
  if(branch !== "main" && branch !== "master") {
     return "Not important";
  }
  
  try {
    const { stage, appName, stageName, token, IAMAccessKey, IAMSecretKey } = await getDataForAutoDeployment({ repoName, branch });
    const buildData = {
      AWS_ACCESS_KEY_ID: IAMAccessKey,
      AWS_SECRET_ACCESS_KEY: IAMSecretKey,
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: repoName.split("/")[0],
      GITHUB_REPO: repoName.split("/")[1],
      STAGE_NAME: stageName,
      SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
      APP_NAME: appName,
    }

    console.log({buildData});
    await invokeBuildFunction(buildData, stage);
    return "success";
  } catch(e) {
    console.log(e.message);
    return e.message;
  }
});
