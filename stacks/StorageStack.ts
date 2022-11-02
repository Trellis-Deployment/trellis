import { createUsersTable } from "../dynamodbTables/users";
import { createAppsTable } from "../dynamodbTables/apps";
import { createStagesTable } from "../dynamodbTables/stages";
import { createDeploymentsTable } from "../dynamodbTables/deployments";
import { Function, StackContext } from "@serverless-stack/resources";
import * as iam from "aws-cdk-lib/aws-iam";

export function StorageStack({ stack, app }: StackContext) {
  const users = createUsersTable(stack);
  const apps = createAppsTable(stack);
  const stages = createStagesTable(stack);
  const deployments = createDeploymentsTable(stack);

  const storeAWSCredentialsLambda = new Function(stack, "storeAppCredentials", {
    handler: "functions/storeAWSCredentials.main",
    timeout: 10,
    environment: {
      REGION: stack.region,
    },
  });

  const writeSecretsPolicy = new iam.PolicyStatement({
    actions: ["secretsmanager:CreateSecret"],
    resources: ["*"],
  });

  storeAWSCredentialsLambda.role?.attachInlinePolicy(
    new iam.Policy(stack, "write-ssm-secrets", {
      statements: [writeSecretsPolicy],
    })
  );
  return {
    users,
    apps,
    stages,
    deployments,
    storeAWSCredentialsLambda,
  };
}
