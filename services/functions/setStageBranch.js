import handler from "../util/templates/handler";
import githubCalls from "util/github/githubCalls";
import getAppByUserAndAppName from "util/appsTableUtils/getAppByUserAndAppName";
import getTokenByUserId from "util/usersTableUtils/getTokenByUserId";
import setStageBranch from '../util/stagesTableUtils/setStageBranch';

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;
  const { stageId, branch, userId, appName } = data;

  try {
    await setStageBranch({ stageId, branch });
    return JSON.stringify({ stageBranch: branch});
  } catch(e) {
    console.log("error in setStageBranch handler:", e.message);
    return e.message;
  }
});


