var aws = require("aws-sdk");
var ecs = new aws.ECS();
import handler from "../util/templates/handler";
const CLUSTER = process.env.CLUSTER;
const TASK_NAME = process.env.TASK_NAME;
const SUBNETS = JSON.parse(process.env.SUBNETS);
const SECURITY_GROUP = process.env.SECURITY_GROUP;
const CONTAINER = process.env.CONTAINER;
const REGION = process.env.REGION;

export const main = handler(async (event, context) => {
  const { data } = event;
  var params = {
    cluster: CLUSTER,
    count: 1,
    launchType: "FARGATE",
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: "DISABLED",
        securityGroups: [SECURITY_GROUP],
        subnets: SUBNETS,
      },
    },
    taskDefinition: TASK_NAME,
    overrides: {
      containerOverrides: [
        {
          environment: [
            {
              name: "REGION",
              value: REGION,
            },
            {
              name: "ACTION",
              value: data.ACTION,
            },
            {
              name: "AWS_SSM_KEY",
              value: data.AWS_SSM_KEY,
            },
            {
              name: "GITHUB_X_ACCESS_TOKEN",
              value: data.GITHUB_X_ACCESS_TOKEN,
            },
            {
              name: "GITHUB_USER",
              value: data.GITHUB_USER,
            },
            {
              name: "GITHUB_REPO",
              value: data.GITHUB_REPO,
            },
            {
              name: "STAGE_NAME",
              value: data.STAGE_NAME,
            },
            {
              name: "DEPLOYMENT_ID",
              value: data.DEPLOYMENT_ID,
            },
            {
              name: "APP_NAME",
              value: data.APP_NAME,
            },
            {
              name: "COMMIT_ID",
              value: data.COMMIT_ID,
            },
            {
              name: "AWS_SSM_ENV",
              value: data.AWS_SSM_ENV,
            },
            {
              name: "NPM_SCRIPT_NAME",
              value: data.NPM_SCRIPT_NAME
            },
          ],
          name: CONTAINER,
        },
      ],
    },
  };

  let taskPromise = new Promise((resolve, reject) => {
    ecs.runTask(params, (err, taskData) => {
      if (err) {
        console.warn("error: ", "Error while starting task: " + err);
        reject();
      } else {
        resolve(taskData);
      }
    });
  });
  return taskPromise;
});
