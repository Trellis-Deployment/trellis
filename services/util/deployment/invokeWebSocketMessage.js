import AWS from "aws-sdk";

const invokeWebSocketMessage = async ({userId, updatedStages}) => {
  const data = {
    userId,
    updatedStages,
    url: process.env.WEB_SOCKET_URL,
  };
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: process.env.WEB_SOCKET_LAMBDA_NAME,
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify({ ...data }),
  };
  const lambdaResponse = await lambda.invoke(params).promise();

  console.log("websocket message invoked");

  return "success";
};

export default invokeWebSocketMessage;

