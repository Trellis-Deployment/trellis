import getAppByRepoName from "../appsTableUtils/getAppByRepoName";
import getStageByAppNameAndBranch from "../stagesTableUtils/getStageByAppNameAndBranch";
import getTokenByLogin from "../usersTableUtils/getTokenByLogin";

const getDataForAutoDeployment = async ({repoName, branch}) => {
  const app = (await getAppByRepoName(repoName))[0];;
  const stage = (await getStageByAppNameAndBranch({ appId: app.appId, stageBranch: branch }))[0];

  const token = await getTokenByLogin(app.ownerLogin);

  return { appName: app.appName, stageName: stage.stageName, token };
};

export default getDataForAutoDeployment;