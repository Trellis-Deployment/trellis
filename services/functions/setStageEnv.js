import handler from "../util/templates/handler";
import setStageEnvLocation from "../util/stagesTableUtils/setStageEnvLocation";
import getStageById from "util/stagesTableUtils/getStageById";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

const REGION = process.env.REGION;

export const main = handler(async (event) => {
  let { envJSONString, stageId } = JSON.parse(event.body);

  const stage = await getStageById(stageId);
  let secretName = stage.envLocation;
  let update = true;

  if (!secretName) {
    secretName = "trellis/" + uuidv4();
    update = false;
  }

  try {
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: process.env.STORE_ENV_LAMBDA_NAME,
      InvocationType: "Event",
      LogType: "Tail",
      Payload: JSON.stringify({
        region: REGION,
        secretName,
        envJSONString,
        update,
      }),
    };
    await lambda.invoke(params).promise();
    let envLocation = secretName;
    await setStageEnvLocation(stageId, envLocation);
    return "Environment variables updated";
  } catch (e) {
    console.log(e.message);
    return { error: e.message };
  }
});
