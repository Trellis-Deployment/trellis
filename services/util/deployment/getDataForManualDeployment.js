import getAppByUserAndAppName from "../appsTableUtils/getAppByUserAndAppName";
import getTokenByLogin from "../usersTableUtils/getTokenByLogin";
import getRepoByUserAndRepoName from "../reposTableUtils/getRepoByUserAndRepoName";

const getDataForManualDeployment = async ({authUser, appName, stageName }) => {
  const app = (await getAppByUserAndAppName({user: authUser, appName}))[0];
  console.log({app});
  const repo = await getRepoByUserAndRepoName({ user: authUser, repoName: app.repo });
  const token = await getTokenByLogin(authUser);
  const [user, repoName] = app.repo.split("/");
  return { appName, stageName, token, cloneUrl: repo.cloneUrl, user, repoName };
};

export default getDataForManualDeployment;