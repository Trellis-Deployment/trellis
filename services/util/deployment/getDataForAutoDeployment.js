import getAppByRepoName from "../appsTableUtils/getAppByRepoName";
import getStageByAppIdAndBranch from "../stagesTableUtils/getStageByAppIdAndBranch";
import getTokenByUserId from "../usersTableUtils/getTokenByUserId";

const getDataForAutoDeployment = async ({repoName, branch}) => {
  const app = (await getAppByRepoName(repoName));
  const stage = await getStageByAppIdAndBranch({ appId: app.appId, stageBranch: branch });

  const token = await getTokenByUserId(app.userId);
  return { stage, appName: app.appName, stageName: stage.stageName, token, IAMAccessKey: stage.IAMAccessKey, IAMSecretKey: stage.IAMSecretKey };
};

export default getDataForAutoDeployment;