import { StackContext } from "@serverless-stack/resources";
import { createUsersTable } from "../dynamodbTables/users";
import { createAppsTable } from "../dynamodbTables/apps";
import { createStagesTable } from "../dynamodbTables/stages";
import { createDeploymentsTable } from "../dynamodbTables/deployments";

import config from "../util/config";

export function StorageStack({ stack, app }: StackContext) {
  const users = createUsersTable(stack);
  const apps = createAppsTable(stack);
  const stages = createStagesTable(stack);
  const deployments = createDeploymentsTable(stack); 

  return {
    users,
    apps,
    stages,
    deployments,
  }
}