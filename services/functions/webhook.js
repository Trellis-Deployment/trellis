import handler from "../util/templates/handler";
import AWS from "aws-sdk";
import getDataForAutoDeployment from "../util/deployment/getDataForAutoDeployment";
import updateStageStateByAppNameUserAndStageName from "util/stagesTableUtils/updateStageStateByAppNameUserAndStageName";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const refArray = (data.ref.split("/"));
  let branch = refArray[refArray.length - 1];
  const repoName = data.repository["full_name"];
  if(branch !== "main" && branch !== "master") {
     return "Not important";
  }

  const {appName, stageName, token, IAMAccessKey, IAMSecretKey, appOwner} = await getDataForAutoDeployment({ repoName, branch });
  const buildData = {
    AWS_ACCESS_KEY_ID: IAMAccessKey,
    AWS_SECRET_ACCESS_KEY: IAMSecretKey,
    GITHUB_USER: appOwner,
    GITHUB_X_ACCESS_TOKEN: token,
    GITHUB_REPO: repoName.split("/")[1],
    STAGE_NAME: stageName,
    SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
    APP_NAME: appName
  }

  console.log({buildData});
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: process.env.DEPLOY_LAMBDA_NAME,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ data: buildData }),
  };
  const lambdaResponse = await lambda.invoke(params).promise();
  console.log({lambdaResponse});
  await updateStageStateByAppNameUserAndStageName({user: appOwner, appName, stageName, state: "deploying"});

  console.log("after invokation");
  return "success";
});
