import handler from "../util/templates/handler";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import getDataForPromotion from "../util/deployment/getDataForPromotion";
import { APIGatewayProxyEventV2 } from "aws-lambda";

interface eventData {
  targetStageId: "string";
  userId: "string";
  appName: "string";
  sourceCommitId: "string";
}

export const main = handler(async (event: APIGatewayProxyEventV2) => {
  console.log("event", event);
  console.log("===============================================");
  console.log("event.body", event.body);
  const parsedEvent: eventData = JSON.parse(event.body);
  const { targetStageId, userId, appName, sourceCommitId } = parsedEvent;
  console.log("targetStageId", targetStageId);
  const {
    stage,
    token,
    user,
    stageName,
    repoName,
    IAMAccessKey,
    IAMSecretKey,
  } = await getDataForPromotion({
    userId,
    appName,
    targetStageId,
  });

  try {
    const data = {
      AWS_ACCESS_KEY_ID: IAMAccessKey,
      AWS_SECRET_ACCESS_KEY: IAMSecretKey,
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: user,
      GITHUB_REPO: repoName,
      STAGE_NAME: stageName,
      SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
      COMMIT_ID: sourceCommitId,
      APP_NAME: appName,
    };

    console.log(data);
    await invokeBuildFunction(data, stage, sourceCommitId);
    return "success";
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});
