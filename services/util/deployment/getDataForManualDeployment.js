import getAppByUserAndAppName from "../appsTableUtils/getAppByUserAndAppName";
import getTokenByLogin from "../usersTableUtils/getTokenByLogin";
import getRepoByUserAndRepoName from "../reposTableUtils/getRepoByUserAndRepoName";
import getStageByAppIdAndStageName from "../stagesTableUtils/getStageByAppIdAndStageName";

const getDataForManualDeployment = async ({authUser, appName, stageName }) => {
  const app = (await getAppByUserAndAppName({user: authUser, appName}))[0];
  const appId  = app.appId;
  const stage = await getStageByAppIdAndStageName({stageName, appId});
  const repo = await getRepoByUserAndRepoName({ user: authUser, repoName: app.repo });
  const token = await getTokenByLogin(authUser);
  const [user, repoName] = app.repo.split("/");
  return { appName, stageName, token, cloneUrl: repo.cloneUrl, user, repoName, IAMAccessKey: stage.IAMAccessKey, IAMSecretKey: stage.IAMSecretKey };
};

export default getDataForManualDeployment;