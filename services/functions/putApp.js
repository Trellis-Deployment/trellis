import handler from "../util/templates/handler";
import putEditedApp from "../util/appsTableUtils/putEditedApp";
import getAppByAppId from "util/appsTableUtils/getAppByAppId";


export const main = handler(async (event) => {
  const appId = await event['pathParameters']['appId'];
  const app = event.body ? JSON.parse(event.body) : null;

  try {
    await putEditedApp(app);
    return await getAppByAppId(appId);
  } catch(e) {
    console.log(e.message);
    throw e;
  }
});