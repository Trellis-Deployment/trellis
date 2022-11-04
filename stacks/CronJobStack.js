import { Cron, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import config from "../util/config";

export function CronJobStack({ stack }) {
  const { users } = use(StorageStack);

  const githubTokenRefresh = new Cron(stack, "GithubTokenRefresh", {
    schedule: 'rate(60 minutes)',
    job: {
      function: {
        permissions: [users],
        environment: {
          Client_ID: config.Client_ID,
          Client_secret: config.Client_secret,
          USERS_TABLE_NAME: users.tableName,
        },
        handler: "functions/githubTokenRefresh.main",
      }
    }
  });

  githubTokenRefresh.attachPermissions(["dynamodb"]);
}
