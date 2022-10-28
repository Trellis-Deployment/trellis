import handler from "../util/templates/handler";
import getStagesByOwnerAndApp from "../util/stagesTableUtils/getStagesByOwnerAndApp";


export const main = handler(async (event) => {
  const userId = await event['queryStringParameters']['user'];
  const app = await event['queryStringParameters']['appName'];
  try {
    const stages = await getStagesByOwnerAndApp({userId: userId, appName: app});
    return(stages);
  } catch(e) {
    console.log(e.message);
    return(e.message);
  }
});