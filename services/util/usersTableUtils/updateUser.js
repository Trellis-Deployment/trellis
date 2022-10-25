import githubCalls from "../github/githubCalls.js";
import dynamodb from "../templates/dynamodb";

const updateUser = async (tokenObject) => {
  const data = await githubCalls.getUserInfo(tokenObject.access_token);

  const params = {
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      login: data.login,
    },
  };

  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error("User not found");
  }

  const putParams = {
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      login: data.login,
    },
    UpdateExpression: "SET userToken = :userToken",
    ExpressionAttributeValues: {
      ":userToken": tokenObject.access_token,
    },
  };
  let user;
  try {
    user = await dynamodb.update(putParams);
  } catch(e) {
    throw new Error(e.message);
  }
  return data;
}

export default updateUser;