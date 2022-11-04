import { Table } from "@serverless-stack/resources";
import config from "../util/config";

export const createStagesTable = (stack) => {
  const stages = new Table(stack, `TrellisStages-V${config.Version}`, {
    fields: {
      stageId: "string",
      appId: "string",
      stageName: "string",
      IAMCredentialsLocation: "string",
      stageBranch: "string",
      stageState: "string",
      lastDeploymentTime: "number",
      lastCommitId: "string",
      npmScriptName: "string",
    },
    primaryIndex: { partitionKey: "stageId" },
    globalIndexes: {
      branchIndex: { partitionKey: "appId", sortKey: "stageBranch" },
      nameIndex: { partitionKey: "appId", sortKey: "stageName" },
    },
  });

  return stages;
};

