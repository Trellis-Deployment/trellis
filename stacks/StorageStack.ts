import { Table, Bucket, StackContext } from "@serverless-stack/resources";
import { createUsersTable } from "../dynamodbTables/users";
import { createAppsTable } from "../dynamodbTables/apps";

import config from "../util/config";

export function StorageStack({ stack, app }: StackContext) {
  const users = createUsersTable(stack);
  const apps = createAppsTable(stack);

  const repos = new Table(stack, `DobbyRepos-V${config.Version}`, {
    fields: {
      repoId: "string",
      repoName: "string",
      userLogin: "string",
      repoUrl: "string",
      cloneUrl: "string"
    },
    primaryIndex: { partitionKey: "userLogin", sortKey: "repoName"},
  });
  
  const stages = new Table(stack, `DobbyStages-V${config.Version}`, {
    fields: {
      stageId: "string",
      stageName: "string",
      appId: "string",
      IAMAccessKey: "string",
      IAMSecretKey: "string",
      stageBranch: "string",
      stageState: "string",
      lastDeploymentTime: "string",
      lastCommitId: "string",
    },
    primaryIndex: { partitionKey: "appId", sortKey: "stageName"},
    globalIndexes: {
      "stageIndex": { partitionKey: "appId", sortKey: 'stageBranch'},
      "idIndex": { partitionKey: "stageId" },
    },
  });

  return {
    users,
    repos,
    apps,
    stages
  }
}