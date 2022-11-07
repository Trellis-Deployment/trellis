import handler from "../util/templates/handler";
import putEditedApp from "../util/appsTableUtils/putEditedApp";
import getAppByAppId from "util/appsTableUtils/getAppByAppId";
import githubCalls from "util/github/githubCalls";
import getUserById from "util/usersTableUtils/getUserById";


export const main = handler(async (event) => {
  const appId = await event['pathParameters']['appId'];
  try {
    await getAppByAppId(appId)
  } catch(e) {
    return{error: `This app has been deleted`}
  }
  const app = event.body ? JSON.parse(event.body) : null;
  let usersPromises = app.users.map(userId => getUserById(userId));
  usersPromises = usersPromises.concat(getUserById(app.userId));
  const users = await Promise.all(usersPromises);
  const tokens = users.map(user => user.userToken);
  const reposPromises = tokens.map(token => githubCalls.getReposByToken(token));
  const repos = await Promise.all(reposPromises);
  const allUsersHaveAccessToRepo = repos.every(userRepos => userRepos.some(repo => {
    return repo['full_name'] === app.repoName;
  }));
  if (!allUsersHaveAccessToRepo) {
    throw new Error("some of the users don't have access to the app's repo, please change the contributors on the github repo or change the users of this app");
  }
  try {
    await putEditedApp(app);
    return await getAppByAppId(appId);
  } catch(e) {
    console.log(e.message);
    throw e;
  }
});