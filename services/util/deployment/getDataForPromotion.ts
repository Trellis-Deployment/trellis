import getAppByUserAndAppName from "../appsTableUtils/getAppByUserAndAppName";
import getTokenByUserId from "../usersTableUtils/getTokenByUserId";
import getStageById from "../stagesTableUtils/getStageById";
import getAppByAppId from "../appsTableUtils/getAppByAppId";

const getDataForPromotion = async ({ userId, appId, targetStageId }) => {
  const app = await getAppByAppId(appId);
  const stage = await getStageById(targetStageId);
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
  };
};

export default getDataForPromotion;
