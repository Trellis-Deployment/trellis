import handler from "../util/templates/handler";
import createWebhook from "../util/createWebhook";
import createAppFromData from "../util/appsTableUtils/createAppFromData";
import createStage from "../util/stagesTableUtils/createStage";
import AWS from "aws-sdk";
import updateAppWithHookId from "../util/appsTableUtils/updateAppWithHookId";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  let app;
  const { appName, userLogin, userId, repoName } = data;

  try {
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: process.env.STORE_AWS_CREDENTIALS_LAMBDA_NAME,
      InvocationType: "RequestResponse",
      LogType: "Tail",
      Payload: JSON.stringify({
        accessKeyId: data.defaultIAMAccessKey,
        secretAccessKey: data.defaultIAMSecretKey,
      }),
    };
    let lambdaResponse = await lambda.invoke(params).promise();
    data.defaultIAMCredentialsLocation = JSON.parse(
      lambdaResponse.Payload
    ).body.replaceAll('"', "");
    app = await createAppFromData(data);
    if (app.message) {
      return { ...app };
    }
  } catch (e) {
    console.log(e.message);
    return { error: e.message };
  }

  const webhookUrl = `https://${event.headers.host}/webhook?user=${userLogin}&repo=${repoName}`;

  let webhookId;
  try {
    webhookId = await createWebhook({
      webhookUrl,
      login: data.userLogin,
      repo: data.repoName,
      userId,
    });
    await updateAppWithHookId(app, webhookId);
  } catch (e) {
    console.log(e.message);
    webhookId = e.message;
  }
  let prodStage;
  let devStage;
  try {
    prodStage = await createStage({
      lastCommitId: "", stageState: "created",
      IAMCredentialsLocation: app.defaultIAMCredentialsLocation,
      appId: app.appId, stageBranch: "undefined",
      stageName: "prod" 
    });
    devStage = await createStage({ 
      lastCommitId: "", stageState: "created", 
      IAMCredentialsLocation: app.defaultIAMCredentialsLocation, 
      appId: app.appId, stageBranch: "main", 
      stageName: "dev" 
    });
  } catch (e) {
    console.log(e.message);
    prodStage = e.message;
  }

  return { app, webhookId, devStage, prodStage };
});
