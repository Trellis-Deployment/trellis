import handler from "../util/templates/handler";
import githubCalls from "../util/github/githubCalls";
import saveUser from "../util/usersTableUtils/saveUser";


export const main = handler(async (event) => {
  const code = event['queryStringParameters']['code'];
  if (!code) {
    return "You didn't send an authentication code";
  }
  const data = await githubCalls.getAccessToken(code);
  const arrayData = data.split("&");
  const objectData = arrayData.reduce((accum, keyValue) => {
    const [key, value] = keyValue.split("=");
    accum[key] = value;
    return accum;
  }, {});

  if (Object.keys(objectData).includes("error")) {
    console.log("unable to authenticate");
    return "unable to authenticate with github";
  } else {
    const user = await saveUser(objectData);
    return ({ user });
  }
});