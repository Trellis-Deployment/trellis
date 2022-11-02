import { Api, use, Function, StackContext, WebSocketApi } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { BuildServerStack } from "./BuildServerStack";
import config from "../util/config";

export function ApiStack({ stack, app }: StackContext) {
  const { users, apps, stages, deployments } = use(StorageStack);
  const { vpc, buildFunction } = use(BuildServerStack);

  const Client_ID = config.Client_ID ? config.Client_ID : "undefined";
  const Client_secret = config.Client_secret || "undefined";

  const webSocketMessage = new Function(stack, "WebSocketFunction", {
    handler: "websocket/sendMessage.handler",
    permissions: [users, apps, stages, deployments],
      environment: {
        USERS_TABLE_NAME: users.tableName,
        APPS_TABLE_NAME: apps.tableName,
        STAGES_TABLE_NAME: stages.tableName,
        DEPLOYMENTS_TABLE_NAME: deployments.tableName,
      },
  });

  // Create the WebSocket API
  const webSocketApi = new WebSocketApi(stack, "webSocketApi", {
    routes: {
      $connect: {
        function: {
          permissions: [users, apps, stages, deployments],
          environment: {
            USERS_TABLE_NAME: users.tableName,
            APPS_TABLE_NAME: apps.tableName,
            STAGES_TABLE_NAME: stages.tableName,
            DEPLOYMENTS_TABLE_NAME: deployments.tableName,
          },
          handler: "websocket/connect.handler",
        }
      },
      $disconnect: {
        function: {
          permissions: [users, apps, stages, deployments],
          environment: {
            USERS_TABLE_NAME: users.tableName,
            APPS_TABLE_NAME: apps.tableName,
            STAGES_TABLE_NAME: stages.tableName,
            DEPLOYMENTS_TABLE_NAME: deployments.tableName,
          },
          handler: "websocket/disconnect.handler",
        }
      },
      sendMessage: {
        function: webSocketMessage,
      }
    },
    accessLog: false,
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [users, apps, stages, deployments, buildFunction, webSocketMessage],
        environment: {
          USERS_TABLE_NAME: users.tableName,
          APPS_TABLE_NAME: apps.tableName,
          STAGES_TABLE_NAME: stages.tableName,
          DEPLOYMENTS_TABLE_NAME: deployments.tableName,
          Client_ID,
          Client_secret,
          DEPLOY_LAMBDA_NAME: buildFunction.functionName,
          WEB_SOCKET_LAMBDA_NAME: webSocketMessage.functionName,
          WEB_SOCKET_URL: webSocketApi.url,
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
      "POST /promote": "functions/promote.main",
    },
    accessLog: false,
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebSocketEndPoint: webSocketApi.url,
  });

  return {
    api,
    webSocketApi
  };
}

