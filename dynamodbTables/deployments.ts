import { Table } from "@serverless-stack/resources";
import config from "../util/config";

export const createDeploymentsTable = (stack) => {
  const deployments = new Table(stack, `TrellisDeployments-V${config.Version}`, {
    fields: {
      deploymentId: "string",
      stageId: "string",
      commitId: "string",
      logs: "string",
      deploymentState: "string",
      time: "number",
    },
    primaryIndex: { partitionKey: "deploymentId" },
    globalIndexes: {
      "branchIndex": { partitionKey: "stageId"},
    },
  });

  return deployments;
}