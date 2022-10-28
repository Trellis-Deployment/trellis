import githubCalls from "../github/githubCalls";
import dynamodb from "../templates/dynamodb";
import { v4 as uuidv4 } from "uuid";

const saveUser = async (tokenObject) => {
  const data = await githubCalls.getUserInfo(tokenObject.access_token);
  console.log(data);
  const userId = uuidv4();
  console.log({userId});
  const newUser = {
    userId,
    githubLogin: data.login,
    email: data.email || "not submitted",
    githubFullName: data.name || "not submitted",
    userToken: tokenObject.access_token,
    refreshToken: tokenObject.refresh_token,
    githubAvatarUrl: data['avatar_url'],
  }
  console.log({newUser});
  
  const params = {
    TableName: process.env.USERS_TABLE_NAME,
    Item: newUser,
  };
  await dynamodb.put(params);

  return params.Item;
}

export default saveUser;