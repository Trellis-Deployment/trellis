import handler from "../util/templates/handler";
import createWebhook from "../util/createWebhook";
import createAppFromData from "../util/appsTableUtils/createAppFromData";
import createStage from "../util/stagesTableUtils/createStage";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  let app;
  const { appName, userLogin, userId, repoName} = data;
  try {
    app = await createAppFromData(data);
    if (app.message) {
      return { ...app }
    }
  } catch(e) {
    console.log(e.message);
    return {error: e.message};
  }

  const webhookUrl = `https://${event.headers.host}/webhook?user=${userLogin}&repo=${repoName}`;

  let webhook;
  try {
    webhook = await createWebhook({webhookUrl, login: data.userLogin, repo: data.repoName, userId});
  } catch(e) {
    console.log(e.message);
    webhook = e.message;
  }
  let prodStage;
  let devStage;
  try {
    prodStage = await createStage({app, branch: null, stageName: "prod"});
    devStage = await createStage({app, branch: "main", stageName: "dev"});
    console.log({prodStage});
  } catch(e) {
    console.log(e.message);
    prodStage = e.message;
  }

  return {app, webhook, devStage, prodStage}


});