import handler from "../util/templates/handler";
import getAppsByOwnerId from "../util/appsTableUtils/getAppsByOwnerId";
import getAppsByUserId from "../util/appsTableUtils/getAppsByUserId";


export const main = handler(async (event) => {
  const userId = await event['queryStringParameters']['user'];
  let apps = await getAppsByOwnerId(userId);
  apps = apps.concat(await getAppsByUserId(userId));
  return(apps);
});