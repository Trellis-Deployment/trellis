import { Table, Bucket, StackContext } from "@serverless-stack/resources";
import config from "../util/config";

export function StorageStack({ stack, app }: StackContext) {
  const users = new Table(stack, `DobbyUsers-V${config.Version}`, {
    fields: {
      login: "string",
      email: "string",
      userName: "string",
      userToken: "string",
      refreshToken: "string"
    },
    primaryIndex: { partitionKey: "login"},
  });

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

  const apps = new Table(stack, `DobbyApps-V${config.Version}`, {
    fields: {
      appId: "string",
      appName: "string",
      ownerLogin: "string",
      appState: "string",
      description: "string",
      repo: "string",
      IAMAccessKey: "string",
      IAMSecretKey: "string",
    },
    primaryIndex: { partitionKey: "ownerLogin", sortKey: "appName"},
    globalIndexes: {
      "repoIndex": { partitionKey: "repo"},
    },
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
    },
    primaryIndex: { partitionKey: "appId", sortKey: "stageName"},
    globalIndexes: {
      "stageIndex": { partitionKey: "appId", sortKey: 'stageBranch'},
    },
  });

  return {
    users,
    repos,
    apps,
    stages
  }
}