import { StackContext } from "@serverless-stack/resources";
import { createUsersTable } from "../dynamodbTables/users";
import { createAppsTable } from "../dynamodbTables/apps";
import { createStagesTable } from "../dynamodbTables/stages";

import config from "../util/config";

export function StorageStack({ stack, app }: StackContext) {
  const users = createUsersTable(stack);
  const apps = createAppsTable(stack);
  const stages = createStagesTable(stack);
  // const stages = new Table(stack, `DobbyStages-V${config.Version}`, {
  //   fields: {
  //     stageId: "string",
  //     stageName: "string",
  //     appId: "string",
  //     IAMAccessKey: "string",
  //     IAMSecretKey: "string",
  //     stageBranch: "string",
  //     stageState: "string",
  //     lastDeploymentTime: "string",
  //     lastCommitId: "string",
  //   },
  //   primaryIndex: { partitionKey: "appId", sortKey: "stageName"},
  //   globalIndexes: {
  //     "stageIndex": { partitionKey: "appId", sortKey: 'stageBranch'},
  //     "idIndex": { partitionKey: "stageId" },
  //   },
  // });

  return {
    users,
    apps,
    stages
  }
}