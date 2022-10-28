import getTokenByUserId from "./usersTableUtils/getTokenByUserId";
import githubCalls from "./github/githubCalls";
import dynamodb from "./templates/dynamodb";

const getReposByUserId = async (userId) => {
  try {
    const token = await getTokenByUserId(userId);
    const repos = await githubCalls.getReposByToken(token);
    const repoNames = [];
    repos.forEach(async repo => {
      repoNames.push(repo["full_name"]);
    });
    return repoNames;
  } catch(e) {
    console.error(e.message);
    return [];
  }
}

export default getReposByUserId;