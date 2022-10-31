import githubCalls from "util/github/githubCalls";
import getTokenByUserId from "util/usersTableUtils/getTokenByUserId";
import getAppByUserAndAppName from "util/appsTableUtils/getAppByUserAndAppName";
import handler from "../util/templates/handler";

export const main = handler(async (event) => {
  const userId = event["queryStringParameters"]['userId'];
  const appName = event["queryStringParameters"]['appName'];
  
  try {
    const appPromise = getAppByUserAndAppName({ userId, appName });
    const tokenPromise = getTokenByUserId(userId);
    const [app, token] = await Promise.all([appPromise, tokenPromise]);

    const branches = await githubCalls.getBranches(token, app.repoName);
    return branches;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});