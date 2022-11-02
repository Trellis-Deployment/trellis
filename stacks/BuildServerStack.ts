import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as logs from "aws-cdk-lib/aws-logs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ecr from "aws-cdk-lib/aws-ecr";
import { Function, StackContext } from "@serverless-stack/resources";

const REPOSITORY_NAME = "build-server";

export function BuildServerStack({ stack }: StackContext) {
  const vpc = new ec2.Vpc(stack, "app", {
    cidr: "10.0.0.0/16",
    maxAzs: 1,
    subnetConfiguration: [
      {
        cidrMask: 17,
        name: "pub",
        subnetType: ec2.SubnetType.PUBLIC,
      },
      {
        cidrMask: 17,
        name: "application",
        subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      },
    ],
  });

  const fargateRole = new iam.Role(stack, "FargateContainerRole", {
    assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
  });

  const ssmGetParametersPolicy = new iam.PolicyStatement({
    actions: ["ssm:GetParameters"],
    resources: ["*"],
  });

  const ssmGetSecretsPolicy = new iam.PolicyStatement({
    actions: ["secretsmanager:GetSecretValue"],
    resources: [
      `arn:aws:secretsmanager:${stack.region}:${stack.account}:secret:trellis/*`,
    ],
  });

  fargateRole.addToPolicy(ssmGetSecretsPolicy);
  fargateRole.addToPolicy(ssmGetParametersPolicy);

  const cluster = new ecs.Cluster(stack, "FargateCluster", {
    vpc,
  });
  const task = new ecs.FargateTaskDefinition(stack, "Task", {
    cpu: 1024,
    memoryLimitMiB: 8192,
    executionRole: fargateRole,
    taskRole: fargateRole,
  });

  const container = task.addContainer("Container", {
    image: ecs.ContainerImage.fromEcrRepository(
      ecr.Repository.fromRepositoryName(
        stack,
        "build-server-repository",
        REPOSITORY_NAME
      ),
      "latest"
    ),
    logging: ecs.LogDrivers.awsLogs({
      streamPrefix: "my-log-group",
      logRetention: logs.RetentionDays.FIVE_DAYS,
    }),
  });
  const buildFunction = new Function(stack, "MyFunction", {
    handler: "functions/startBuildServer.main",
    timeout: 10,
    vpc,
    vpcSubnets: {
      subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
    },
    environment: {
      CLUSTER: cluster.clusterName,
      TASK_NAME: task.taskDefinitionArn,
      CONTAINER: container.containerName,
      REGION: stack.region,
      SUBNETS: JSON.stringify(
        vpc.privateSubnets.map((subnet) => subnet.subnetId)
      ),
      SECURITY_GROUP: vpc.vpcDefaultSecurityGroup,
    },
  });

  const ecsPolicy = new iam.PolicyStatement({
    actions: ["ecs:RunTask", "iam:PassRole"],
    resources: ["*"],
  });

  buildFunction.role?.attachInlinePolicy(
    new iam.Policy(stack, "run-ecs-tasks", {
      statements: [ecsPolicy],
    })
  );

  stack.addOutputs({
    function: buildFunction.functionName,
  });

  return {
    vpc,
    buildFunction,
    ssmGetParametersPolicy,
    ssmGetSecretsPolicy,
    container
  };
}
