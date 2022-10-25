import handler from "../util/templates/handler";
import getDataForManualDeployment from "../util/deployment/getDataForManualDeployment";
import AWS from "aws-sdk";
import updateStageStateByAppNameUserAndStageName from "../util/stagesTableUtils/updateStageStateByAppNameUserAndStageName";

export const main = handler(async (event) => {
  const {authUser, appName, stageName} = JSON.parse(event.body);
  const { token, user, repoName } = await getDataForManualDeployment({ authUser, appName, stageName });
  const data = { 
    AWS_ACCESS_KEY_ID: 'AKIAWW3QD3YVYZCUFVQN', 
    AWS_SECRET_ACCESS_KEY: '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',
    GITHUB_X_ACCESS_TOKEN: token,
    GITHUB_USER: user,
    GITHUB_REPO: repoName,
    STAGE_NAME: stageName,
    SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
    APP_NAME: appName,
  };
  console.log(data);
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: process.env.DEPLOY_LAMBDA_NAME,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ data }),
  };

  const lambdaResponse = await lambda.invoke(params).promise();
  console.log(lambdaResponse);
  await updateStageStateByAppNameUserAndStageName({user: authUser, appName, stageName, state: "deploying"});

  console.log("after invokation");
  return "success";

});