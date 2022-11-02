import handler from "../util/templates/handler";
import createWebhook from "../util/createWebhook";
import createAppFromData from "../util/appsTableUtils/createAppFromData";
import createStage from "../util/stagesTableUtils/createStage";
import AWS from "aws-sdk";

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

  let webhook;
  try {
    webhook = await createWebhook({
      webhookUrl,
      login: data.userLogin,
      repo: data.repoName,
      userId,
    });
  } catch (e) {
    console.log(e.message);
    webhook = e.message;
  }
  let prodStage;
  let devStage;
  try {
    prodStage = await createStage({ app, branch: null, stageName: "prod" });
    devStage = await createStage({ app, branch: "main", stageName: "dev" });
    console.log({ prodStage });
  } catch (e) {
    console.log(e.message);
    prodStage = e.message;
  }

  return { app, webhook, devStage, prodStage };
});
