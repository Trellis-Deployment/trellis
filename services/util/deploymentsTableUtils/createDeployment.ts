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

const createDeployment = async ({ stageId, commitId, state }) => {
  const deploymentId = UUIDV4();
  const time = new Date().getTime();
  state = state ? state : 'deploying';
  const newDeployment = {
    deploymentId,
    stageId,
    commitId,
    logs: "",
    deploymentState: state,
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

