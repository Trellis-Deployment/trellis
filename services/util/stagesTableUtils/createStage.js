import { v4 as UUIDV4 } from "uuid";
import dynamodb from "../templates/dynamodb";
const createStage = async ({app, branch, stageName}) => {
  if (!branch) {
    branch = "undefined";
  }

  const stageId = UUIDV4();

  const newStage = {
    stageId,
    stageName,
    appId: app.appId,
    IAMAccessKey: app.defaultIAMAccessKey,
    IAMSecretKey: app.defaultIAMSecretKey,
    stageBranch: branch,
    stageState: "created",
    lastCommitId: ""
  };
  
  const params = {
    TableName: process.env.STAGES_TABLE_NAME,
    Item: newStage,
  };
  try {
    await dynamodb.put(params);
    return params.Item;
  } catch(e) {
    return {error: e.message};
  }
}

export default createStage;