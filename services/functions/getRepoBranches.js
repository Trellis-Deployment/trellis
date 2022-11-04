import githubCalls from "util/github/githubCalls";
import getTokenByUserId from "util/usersTableUtils/getTokenByUserId";
import handler from "../util/templates/handler";
import getAppByAppId from "util/appsTableUtils/getAppByAppId";

// Assumes that any user that has access to Trellis app has access to its repo
export const main = handler(async (event) => {
  const userId = event["queryStringParameters"]['userId'];
  const appId = event["queryStringParameters"]['appId'];
  
  try {
    const appPromise = getAppByAppId(appId);
    const tokenPromise = getTokenByUserId(userId);
    const [app, token] = await Promise.all([appPromise, tokenPromise]);

    const branches = await githubCalls.getBranches(token, app.repoName);
    return branches;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});