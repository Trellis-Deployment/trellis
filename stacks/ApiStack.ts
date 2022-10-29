import { Api, use, Function, StackContext } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { BuildServerStack } from "./BuildServerStack";
import config from "../util/config";

export function ApiStack({ stack, app }: StackContext) {
  const { users, apps, stages, deployments } = use(StorageStack);
  const { vpc, buildFunction } = use(BuildServerStack);

  const Client_ID = config.Client_ID ? config.Client_ID : "undefined";
  const Client_secret = config.Client_secret || "undefined";

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [users, apps, stages, deployments, buildFunction],
        environment: {
          USERS_TABLE_NAME: users.tableName,
          APPS_TABLE_NAME: apps.tableName,
          STAGES_TABLE_NAME: stages.tableName,
          DEPLOYMENTS_TABLE_NAME: deployments.tableName,
          Client_ID,
          Client_secret,
          DEPLOY_LAMBDA_NAME: buildFunction.functionName,
        },
      },
    },

    routes: {
      "GET /signup": "functions/signup.main",
      "GET /signin": "functions/signin.main",
      "GET /repos": "functions/repos.main",
      "GET /apps": "functions/apps.main",
      "GET /stages": "functions/stages.main",
      "GET /stageStatus": "functions/getStageStatus.main",
      "GET /deployments": "functions/deployments.main",
      "POST /apps": "functions/createApp.main",
      "POST /webhook": "functions/webhook.main",
      "POST /build": "functions/manualBuild.main",
      "POST /setStatus": "functions/setDeploymentStatus.main",
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  }
}