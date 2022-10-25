import getTokenByLogin from "./usersTableUtils/getTokenByLogin";
import githubCalls from "./github/githubCalls";
import dynamodb from "./templates/dynamodb";

const getReposByLogin = async (login) => {

  try {
    const token = await getTokenByLogin(login);
    const repos = await githubCalls.getReposByToken(token);
    const repoNames = [];
    repos.forEach(async repo => {
      repoNames.push(repo["full_name"]);
      const params = {
        TableName: process.env.REPOS_TABLE_NAME,
        Item: {
          repoName: repo["full_name"],
          repoUrl: repo.url,
          userLogin: login,
          cloneUrl: repo['clone_url'],
        },
      }
      
      await dynamodb.put(params);
    });
    return repoNames;
  } catch(e) {
    console.error(e.message);
    return [];
  }
}

export default getReposByLogin;