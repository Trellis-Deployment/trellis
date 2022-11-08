import getTokenByUserId from "./usersTableUtils/getTokenByUserId";
import githubCalls from "./github/githubCalls";
const createWebhook = async ({webhookUrl, login, userId, repo}) => {
  const token = await getTokenByUserId(userId);
  try {
    return await githubCalls.createWebhook(token, webhookUrl, login, repo);
  } catch(e) {
    console.log(e.message);
    return "failed to create webhook";
  }
}

export default createWebhook;