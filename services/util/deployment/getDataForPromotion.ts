import getAppByUserAndAppName from "../appsTableUtils/getAppByUserAndAppName";
import getTokenByUserId from "../usersTableUtils/getTokenByUserId";
import getStageById from "../stagesTableUtils/getStageById";

const getDataForPromotion = async ({ userId, appName, targetStageId }) => {
  const app = await getAppByUserAndAppName({ userId, appName });
  const appId = app.appId;
  const stage = await getStageById(targetStageId);
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
    IAMAccessKey: stage.IAMAccessKey,
    IAMSecretKey: stage.IAMSecretKey,
  };
};

export default getDataForPromotion;
