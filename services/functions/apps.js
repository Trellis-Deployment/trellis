import handler from "../util/templates/handler";
import getAppsByOwnerId from "../util/appsTableUtils/getAppsByOwnerId";
import getAppsByUserId from "../util/appsTableUtils/getAppsByUserId";


export const main = handler(async (event) => {
  const userId = await event['queryStringParameters']['user'];
  console.log({userId});
  let apps = await getAppsByOwnerId(userId);
  apps = apps.concat(await getAppsByUserId(userId));
  console.log({apps});
  return(apps);
});