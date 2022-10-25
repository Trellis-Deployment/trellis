import handler from "../util/templates/handler";
import createWebhook from "../util/createWebhook";
import createAppFromData from "../util/appsTableUtils/createAppFromData";
import createStage from "../util/stagesTableUtils/createStage";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  let app;
  
  try {
    app = await createAppFromData(data);
  } catch(e) {
    console.log(e.message);
    return {error: e.message};
  }

  //const repo = data.repo.split("/")[1];
  const webhookUrl = `https://${event.headers.host}/webhook?user=${data.user}&repo=${data.repo}`;

  let webhook;
  try {
    webhook = await createWebhook(webhookUrl, data.user, data.repo);
  } catch(e) {
    console(e.message);
    webhook = e.message;
  }
  let prodStage;
  let devStage;
  try {
    prodStage = await createStage(app, null, "prod");
    devStage = await createStage(app, "main", "dev");
    console.log({prodStage});
  } catch(e) {
    console.log(e.message);
    prodStage = e.message;
  }

  return {app, webhook, devStage, prodStage}


});