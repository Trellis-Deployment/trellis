import {
  Api,
  use,
  Function,
  StackContext,
  WebSocketApi,
} from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { BuildServerStack } from "./BuildServerStack";
import config from "../util/config";
import * as destinations from "aws-cdk-lib/aws-logs-destinations";
import * as logs from "aws-cdk-lib/aws-logs";

export function ApiStack({ stack, app }: StackContext) {
  const { buildFunction, logGroup } = use(BuildServerStack);
  const {
    users,
    apps,
    stages,
    deployments,
    storeAWSCredentialsLambda,
    storeEnvLambda,
  } = use(StorageStack);

  const Client_ID = config.Client_ID ? config.Client_ID : "undefined";
  const Client_secret = config.Client_secret || "undefined";

  const webSocketMessage = new Function(stack, "WebSocketFunction", {
    handler: "websocket/sendMessage.handler",
    permissions: [users],
    environment: {
      USERS_TABLE_NAME: users.tableName,
    },
  });

  const webSocketApi = new WebSocketApi(stack, "webSocketApi", {
    routes: {
      $connect: {
        function: {
          permissions: [users],
          environment: {
            USERS_TABLE_NAME: users.tableName,
          },
          handler: "websocket/connect.handler",
        },
      },
      $disconnect: {
        function: {
          permissions: [users],
          environment: {
            USERS_TABLE_NAME: users.tableName,
          },
          handler: "websocket/disconnect.handler",
        },
      },
      sendMessage: {
        function: webSocketMessage,
      },
    },
    accessLog: false,
  });

  const logEventResponseLambda = new Function(stack, "logEventLambda", {
    handler: "functions/eventLambda.main",
    permissions: [users, apps, stages, deployments, webSocketMessage],
    environment: {
      USERS_TABLE_NAME: users.tableName,
      APPS_TABLE_NAME: apps.tableName,
      STAGES_TABLE_NAME: stages.tableName,
      DEPLOYMENTS_TABLE_NAME: deployments.tableName,
      WEB_SOCKET_LAMBDA_NAME: webSocketMessage.functionName,
      REGION: config.Region,
      WEB_SOCKET_URL: webSocketApi.url,
    },
  });

  new logs.SubscriptionFilter(this, "buildContainerSubscription", {
    logGroup,
    destination: new destinations.LambdaDestination(logEventResponseLambda),
    filterPattern: logs.FilterPattern.allEvents(),
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [
          users,
          apps,
          stages,
          deployments,
          buildFunction,
          webSocketMessage,
          storeAWSCredentialsLambda,
          storeEnvLambda,
        ],
        environment: {
          REGION: stack.region,
          USERS_TABLE_NAME: users.tableName,
          APPS_TABLE_NAME: apps.tableName,
          STAGES_TABLE_NAME: stages.tableName,
          DEPLOYMENTS_TABLE_NAME: deployments.tableName,
          Client_ID,
          Client_secret,
          DEPLOY_LAMBDA_NAME: buildFunction.functionName,
          WEB_SOCKET_LAMBDA_NAME: webSocketMessage.functionName,
          WEB_SOCKET_URL: webSocketApi.url,
          STORE_AWS_CREDENTIALS_LAMBDA_NAME:
            storeAWSCredentialsLambda.functionName,
          STORE_ENV_LAMBDA_NAME: storeEnvLambda.functionName,
        },
      },
    },

    routes: {
      "GET /signup": "functions/signup.main",
      "GET /signin": "functions/signin.main",
      "GET /users": "functions/users.main",
      "GET /repos": "functions/repos.main",
      "GET /apps": "functions/apps.main",
      "GET /app/{appId}": "functions/app.main",
      "GET /stages": "functions/stages.main",
      "GET /deployments": "functions/deployments.main",
      "POST /apps": "functions/createApp.main",
      "POST /webhook": "functions/webhook.main",
      "POST /build": "functions/manualBuild.main",
      "POST /stageCredentials": "functions/setStageCredentials.main",
      "POST /stageEnv": "functions/setStageEnv.main",
      "POST /teardown": "functions/teardown.main",
      "POST /promote": "functions/promote.main",
      "POST /stage": "functions/createStage.main",
      "GET /repoBranches": "functions/getRepoBranches.main",
      "PUT /stageBranch": "functions/setStageBranch.main",
      "PUT /app/{appId}": "functions/putApp.main",
      "PUT /npmScriptName": "functions/setStageNPMCommand.main",
      "DELETE /app/{appId}": "functions/deleteApp.main",
      "DELETE /stage/{stageId}": "functions/deleteStage.main",
      "PUT /stageUnitTest": "functions/setStageIsUnitTestRequired.main",
    },
    accessLog: false,
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebSocketEndPoint: webSocketApi.url,
  });

  return {
    api,
    webSocketApi,
  };
}

