import AWS from "aws-sdk";
import updateStageState from "../stagesTableUtils/updateStageState";

const invokeBuildFunction = async (data, stage, commitId) => {
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: process.env.DEPLOY_LAMBDA_NAME,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ data: data }),
  };
  const lambdaResponse = await lambda.invoke(params).promise();
  await updateStageState({stage, state: "deploying", commitId });

  console.log("after invokation");

  return "success";
}

export default invokeBuildFunction;