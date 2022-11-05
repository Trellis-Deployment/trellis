import handler from "../util/templates/handler";
import invokeBuildFunction from "../util/deployment/invokeBuildFunction";
import getDataForPromotion from "../util/deployment/getDataForPromotion";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import createDeployment, {
  NewDeployment,
} from "../util/deploymentsTableUtils/createDeployment";
import getStagesByAppId from "../util/stagesTableUtils/getStagesByAppId";
import invokeWebSocketMessage from "util/deployment/invokeWebSocketMessage";

interface eventData {
  targetStageId: "string";
  userId: "string";
  appId: "string";
  sourceCommitId: "string";
}

export const main = handler(async (event: APIGatewayProxyEventV2) => {
  const parsedEvent: eventData = JSON.parse(event.body);
  const { targetStageId, userId, appId, sourceCommitId } = parsedEvent;
  const { stage, token, user, stageName, repoName, appName } = await getDataForPromotion(
    {
      userId,
      appId,
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
      state: "deploying",
    })) as NewDeployment;

    if (deployment.error) {
      throw new Error("failed to create deployment prior to promotion");
    }

    const data = {
      AWS_SSM_KEY: stage.IAMCredentialsLocation,
      AWS_SSM_ENV: stage.envLocation,
      ACTION: "deploy",
      GITHUB_X_ACCESS_TOKEN: token,
      GITHUB_USER: user,
      GITHUB_REPO: repoName,
      STAGE_NAME: stageName,
      COMMIT_ID: sourceCommitId,
      APP_NAME: appName,
      DEPLOYMENT_ID: deployment.deploymentId,
      NPM_SCRIPT_NAME: stage.npmScriptName,
    };

    await invokeBuildFunction(data, stage, sourceCommitId);
    const updatedStages = await getStagesByAppId(stage.appId);
    await invokeWebSocketMessage({ userId, updatedStages });
    return "success";
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});
