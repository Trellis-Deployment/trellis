import { v4 as UUIDV4 } from "uuid";
import dynamodb from "../templates/dynamodb";
const createStage = async (newStage) => {
  const stageId = UUIDV4();
  newStage.stageId = stageId;

  const params = {
    TableName: process.env.STAGES_TABLE_NAME,
    Item: newStage,
  };
  try {
    await dynamodb.put(params);
    return params.Item;
  } catch (e) {
    return { error: e.message };
  }
};

export default createStage;

