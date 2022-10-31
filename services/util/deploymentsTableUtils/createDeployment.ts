import { v4 as UUIDV4 } from "uuid";
import dynamodb from "../templates/dynamodb";

export interface NewDeployment {
  deploymentId: string;
  stageId: string;
  commitId: string;
  logs: string;
  deploymentState: string;
  time: number;
  error?: string;
}

const createDeployment = async ({ stageId, commitId }) => {
  const deploymentId = UUIDV4();
  const time = new Date().getTime();
  const newDeployment = {
    deploymentId,
    stageId,
    commitId,
    logs: "",
    deploymentState: "deploying",
    time: time,
  };

  const params = {
    TableName: process.env.DEPLOYMENTS_TABLE_NAME,
    Item: newDeployment,
  };

  try {
    await dynamodb.put(params);
    return params.Item;
  } catch (e) {
    return { error: e.message };
  }
};

export default createDeployment;

