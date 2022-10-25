import handler from "../util/templates/handler";
import getReposByLogin from "../util/getReposByLogin";


export const main = handler(async (event) => {
  const login = await event['queryStringParameters']['user'];
  const repoNames = await getReposByLogin(login);
  return(repoNames);
});