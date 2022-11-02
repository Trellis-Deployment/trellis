import handler from "../util/templates/handler";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import getDataForPromotion from "../util/deployment/getDataForPromotion";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import createDeployment, {
  NewDeployment,
} from "../util/deploymentsTableUtils/createDeployment";
import getStageByAppIdAndStageName from "util/stagesTableUtils/getStageByAppIdAndStageName";
import getStagesByAppId from "../util/stagesTableUtils/getStagesByAppId";
import invokeWebSocketMessage from "util/deployment/invokeWebSocketMessage";

interface eventData {
  targetStageId: "string";
  userId: "string";
  appName: "string";
  sourceCommitId: "string";
}

export const main = handler(async (event: APIGatewayProxyEventV2) => {
  const parsedEvent: eventData = JSON.parse(event.body);
  const { targetStageId, userId, appName, sourceCommitId } = parsedEvent;
  const { stage, token, user, stageName, repoName } = await getDataForPromotion(
    {
      userId,
      appName,
      targetStageId,
    }
  );

  if (stage.state === "deploying") {
    return "Cannot deploy to production right now";
  }

  try {
    const deployment = (await createDeployment({
      stageId: targetStageId,
      commitId: sourceCommitId,
    })) as NewDeployment;

    if (deployment.error) {
      throw new Error("failed to create deployment prior to promotion");
    }

    const data = {
      AWS_SSM_KEY: stage.IAMCredentialsLocation,
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: user,
      GITHUB_REPO: repoName,
      STAGE_NAME: stageName,
      SET_STATUS_URL: `https://${event.headers.host}/setStatus`,
      COMMIT_ID: sourceCommitId,
      APP_NAME: appName,
      DEPLOYMENT_ID: deployment.deploymentId,
    };

    await invokeBuildFunction(data, stage, sourceCommitId);
    const updatedStages = await getStagesByAppId(stage.appId);
    await invokeWebSocketMessage({userId, updatedStages});
    return "success";
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});
