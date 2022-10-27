import getTokenByLogin from "./usersTableUtils/getTokenByUserId";
import githubCalls from "./github/githubCalls";
const createWebhook = async (webhookUrl, user, repo) => {
  const token = await getTokenByLogin(user);
  try {
    await githubCalls.createWebhook(token, webhookUrl, user, repo);
    return "success";
  } catch(e) {
    console.log(e.message);
    return "failed to create webhook";
  }
  
}

export default createWebhook;