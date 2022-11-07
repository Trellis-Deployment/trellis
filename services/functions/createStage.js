import handler from "../util/templates/handler";
import { v4 as uuidv4 } from "uuid";
import createStage from "../util/stagesTableUtils/createStage";
import AWS from "aws-sdk";

export const main = handler(async (event) => {
  const newStage = JSON.parse(event.body);
  const { envVariablesString } = newStage;
  let secretName = "trellis/" + uuidv4();
  try { 
    if (envVariablesString) {
      const lambda = new AWS.Lambda();
      const params = {
        FunctionName: process.env.STORE_ENV_LAMBDA_NAME,
        InvocationType: "Event",
        LogType: "Tail",
        Payload: JSON.stringify({
          region: REGION,
          secretName,
          envVariablesString,
          update: false,
        }),
      };
      await lambda.invoke(params).promise();
      let envLocation = secretName;
      newStage.envLocation = envLocation;
    }
    delete newStage.envVariablesString;
    const stage = await createStage(newStage);
    return stage;
    
  } catch(e) {
    console.log(e.message);
    return { error: e.message };
  }
  console.log({data});
});