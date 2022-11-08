import getTokenByUserId from "../usersTableUtils/getTokenByUserId";
import getStageById from "../stagesTableUtils/getStageById";
import getAppByAppId from "../appsTableUtils/getAppByAppId";

const getDataForPromotion = async ({ userId, appId, targetStageId }) => {
  const app = await getAppByAppId(appId);
  const stage = await getStageById(targetStageId);
  const [user, repoName] = app.repoName.split("/");
  const token = await getTokenByUserId(userId);
  return {
    stage,
    appName: app.appName,
    stageName: stage.stageName,
    token,
    user,
    repoName,
  };
};

export default getDataForPromotion;
