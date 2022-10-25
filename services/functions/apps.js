import handler from "../util/templates/handler";
import getAppsByOwner from "../util/appsTableUtils/getAppsByOwner";


export const main = handler(async (event) => {
  const login = await event['queryStringParameters']['user'];
  const apps = await getAppsByOwner(login);
  return(apps);
});