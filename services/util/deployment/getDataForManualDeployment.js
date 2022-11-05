import getTokenByUserId from "../usersTableUtils/getTokenByUserId";
import getStageById from "../stagesTableUtils/getStageById";
import getAppByAppId from "../appsTableUtils/getAppByAppId";

const getDataForManualDeployment = async ({ userId, appId, stageId }) => {
  const app = await getAppByAppId(appId);
  const stage = await getStageById(stageId);
  console.log({ stage });
  const token = await getTokenByUserId(userId);
  const [user, repoName] = app.repoName.split("/");
  return {
    stage,
    appName: app.appName,
    stageName: stage.stageName,
    token,
    user,
    repoName,
    IAMCredentialsLocation: stage.IAMCredentialsLocation,
  };
};

export default getDataForManualDeployment;
