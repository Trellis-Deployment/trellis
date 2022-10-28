import { Table } from "@serverless-stack/resources";
import config from "../util/config";

export const createAppsTable = (stack) => {
  const apps = new Table(stack, `TrellisApps-V${config.Version}`, {
    fields: {
      appId: "string",
      appName: "string",
      userId: "string",
      description: "string",
      repoName: "string",
      defaultIAMAccessKey: "string",
      defaultIAMSecretKey: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "appId" },
    globalIndexes: {
      "repoIndex": { partitionKey: "repoName" },
      "appNameIndex": { partitionKey: "userId", sortKey: "appName" }
    },
  });

  return apps;
}
