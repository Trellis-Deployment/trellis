import getAppByUserAndAppName from "../appsTableUtils/getAppByUserAndAppName";
import getTokenByUserId from "../usersTableUtils/getTokenByUserId";
import getStageById from "../stagesTableUtils/getStageById";

const getDataForManualDeployment = async ({ userId, appName, stageId }) => {
  const app = await getAppByUserAndAppName({ userId, appName });
  const appId = app.appId;
  const stage = await getStageById(stageId);
  console.log({ stage });
  const token = await getTokenByUserId(userId);
  const [user, repoName] = app.repoName.split("/");
  return {
    stage,
    appName,
    stageName: stage.stageName,
    token,
    user,
    repoName,
    IAMCredentialsLocation: stage.IAMCredentialsLocation,
  };
};

export default getDataForManualDeployment;
