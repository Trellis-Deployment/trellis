import handler from "../util/templates/handler";
import githubCalls from "util/github/githubCalls";
import getAppByUserAndAppName from "util/appsTableUtils/getAppByUserAndAppName";
import getTokenByUserId from "util/usersTableUtils/getTokenByUserId";
import setStageBranch from '../util/stagesTableUtils/setStageBranch';

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;
  const { stageId, branch, userId, appName } = data;

  try {
    const appPromise = getAppByUserAndAppName({ userId, appName });
    const tokenPromise = getTokenByUserId(userId);
    const [app, token] = await Promise.all([appPromise, tokenPromise]);
    const [owner, repo] = app.repoName.split('/');
    const lastBranchCommit = await githubCalls.getLastBranchCommit({ token, userLogin: owner, repo, branch });
    const lastBranchCommitId = lastBranchCommit.sha;
    await setStageBranch({ stageId, branch, lastCommitId: lastBranchCommitId });

    return JSON.stringify({lastCommitId: lastBranchCommitId, stageBranch: branch});
  } catch(e) {
    console.log("error in setStageBranch handler:", e.message);
    return e.message;
  }
});


