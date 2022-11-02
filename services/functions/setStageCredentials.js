import handler from "../util/templates/handler";
import setStageCredentials from "../util/stagesTableUtils/setStageCredentials";
import AWS from "aws-sdk";

export const main = handler(async (event) => {
  const { accessKeyId, secretAccessKey, stageId } = JSON.parse(event.body);
  try {
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: process.env.STORE_AWS_CREDENTIALS_LAMBDA_NAME,
      InvocationType: "RequestResponse",
      LogType: "Tail",
      Payload: JSON.stringify({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      }),
    };
    let lambdaResponse = await lambda.invoke(params).promise();
    let newCredentials = JSON.parse(lambdaResponse.Payload).body.replaceAll(
      '"',
      ""
    );
    await setStageCredentials(stageId, newCredentials);
    return "Credentials updated";
  } catch (e) {
    console.log(e.message);
    return { error: e.message };
  }
});
