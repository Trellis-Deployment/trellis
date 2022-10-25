import handler from "../util/templates/handler";
import getStagesByOwnerAndApp from "../util/stagesTableUtils/getStagesByOwnerAndApp";


export const main = handler(async (event) => {
  const login = await event['queryStringParameters']['user'];
  const app = await event['queryStringParameters']['appName'];
  try {
    const stages = await getStagesByOwnerAndApp({ownerLogin: login, appName: app});
    return(stages);
  } catch(e) {
    return(new Error(e.message));
  }
});