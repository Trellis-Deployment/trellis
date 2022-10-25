import handler from "../util/templates/handler";
import { APIGatewayProxyEvent } from "aws-lambda";
import updateStageStateByAppNameUserAndStageName from "../util/stagesTableUtils/updateStageStateByAppNameUserAndStageName";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const data = event.body ? JSON.parse(event.body) : null;

  updateStageStateByAppNameUserAndStageName({user: data.GITHUB_USER, stageName: data.STAGE_NAME, appName: data.APP_NAME, state: "deployed"});

  return "success";
});