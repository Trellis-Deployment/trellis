import handler from "../util/templates/handler";
import getReposByUserId from "../util/getReposByUserId";


export const main = handler(async (event) => {
  const userId = await event['queryStringParameters']['user'];
  const repoNames = await getReposByUserId(userId);
  return(repoNames);
});