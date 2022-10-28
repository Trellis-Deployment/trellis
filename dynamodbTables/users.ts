import { Table } from "@serverless-stack/resources";
import config from "../util/config";

export const createUsersTable = (stack) => {
  const users = new Table(stack, `TrellisUsers-V${config.Version}`, {
    fields: {
      userId: "string",
      githubLogin: "string",
      email: "string",
      githubFullName: "string",
      userToken: "string",
      refreshToken: "string",
      githubAvatarUrl: "string"
    },
    primaryIndex: { partitionKey: "userId"},
    globalIndexes: {
      "loginIndex": { partitionKey: "githubLogin"},
    },
  });

  return users;
}
