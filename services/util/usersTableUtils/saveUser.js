import githubCalls from "../github/githubCalls";
import dynamodb from "../templates/dynamodb";
import { v4 as UUIDV4 } from "uuid";

const saveUser = async (tokenObject) => {
  const data = await githubCalls.getUserInfo(tokenObject.access_token);
  const userId = new UUIDV4();
  const newUser = {
    login: data.login,
    userName: data.name || "not submitted",
    email: data.email || "not submitted",
    userToken: tokenObject.access_token,
    refreshToken: tokenObject.refresh_token
  }
  
  
  const params = {
    TableName: process.env.USERS_TABLE_NAME,
    Item: newUser,
  };
  await dynamodb.put(params);

  return params.Item;
}

export default saveUser;