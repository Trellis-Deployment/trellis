var aws = require("aws-sdk");
var ecs = new aws.ECS();
import handler from "../util/templates/handler";
const CLUSTER = process.env.CLUSTER;
const TASK_NAME = process.env.TASK_NAME;
const SUBNETS = JSON.parse(process.env.SUBNETS);
const SECURITY_GROUP = process.env.SECURITY_GROUP;
const CONTAINER = process.env.CONTAINER;

export const main = handler((event, context) => {
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
              name: "AWS_ACCESS_KEY_ID",
              value: data.AWS_ACCESS_KEY_ID,
            },
            {
              name: "AWS_SECRET_ACCESS_KEY",
              value: data.AWS_SECRET_ACCESS_KEY,
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
              name: "SET_STATUS_URL",
              value: data.SET_STATUS_URL,
            },
            {
              name: "APP_NAME",
              value: data.APP_NAME,
            }
          ],
          name: CONTAINER,
        },
      ],
    },
  };

  ecs.runTask(params, (err) => {
    if (err) {
      console.warn("error: ", "Error while starting task: " + err);
    }
  });

  return "Build Task Commenced";
});
