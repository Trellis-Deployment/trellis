import { Api, use, Function, StackContext } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import config from "../util/config";

export function ApiStack({ stack, app }: StackContext) {
  const { users, repos, apps, stages } = use(StorageStack);
  const Client_ID = config.Client_ID ? config.Client_ID : "undefined";
  const Client_secret = config.Client_secret || "undefined";

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [users, repos, apps, stages],
        environment: {
          USERS_TABLE_NAME: users.tableName,
          REPOS_TABLE_NAME: repos.tableName,
          APPS_TABLE_NAME: apps.tableName,
          STAGES_TABLE_NAME: stages.tableName,
          Client_ID,
          Client_secret,
        },
      },
    },

    routes: {
      "GET /signup": "functions/signup.main",
      "GET /signin": "functions/signin.main",
      "GET /repos": "functions/repos.main",
    }
  });


  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  }
}