import handler from "../util/templates/handler";
import getAppByAppId from "util/appsTableUtils/getAppByAppId";


export const main = handler(async (event) => {
  const appId = await event['pathParameters']['appId'];
  try {
    const app = await getAppByAppId(appId);
    return(app);
  } catch(e) {
    console.log(e.message);
    throw e;
  }
});