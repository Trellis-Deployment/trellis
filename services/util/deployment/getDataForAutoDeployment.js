import getAppByRepoName from "../appsTableUtils/getAppByRepoName";
import getStageByAppIdAndBranch from "../stagesTableUtils/getStageByAppIdAndBranch";
import getTokenByLogin from "../usersTableUtils/getTokenByUserId";

const getDataForAutoDeployment = async ({repoName, branch}) => {
  const app = (await getAppByRepoName(repoName))[0];
  const stage = (await getStageByAppIdAndBranch({ appId: app.appId, stageBranch: branch }))[0];

  const token = await getTokenByLogin(app.ownerLogin);
  return { appName: app.appName, stageName: stage.stageName, token, IAMAccessKey: stage.IAMAccessKey, IAMSecretKey: stage.IAMSecretKey, appOwner: app.ownerLogin };
};

export default getDataForAutoDeployment;