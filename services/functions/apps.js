import handler from "../util/templates/handler";
import getAppsByOwnerId from "../util/appsTableUtils/getAppsByOwnerId";


export const main = handler(async (event) => {
  const login = await event['queryStringParameters']['user'];
  const apps = await getAppsByOwnerId(login);
  return(apps);
});