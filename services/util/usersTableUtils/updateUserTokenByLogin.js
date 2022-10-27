import githubCalls from "../github/githubCalls.js";
import dynamodb from "../templates/dynamodb";

const updateUser = async (tokenObject) => {
  const data = await githubCalls.getUserInfo(tokenObject.access_token);
  const params = {
    TableName: process.env.USERS_TABLE_NAME,
    IndexName: "loginIndex",
    KeyConditionExpression: "githubLogin = :githubLogin",
    ExpressionAttributeValues: {
      ":githubLogin" : data.login,
    },
  };

  const result = await dynamodb.query(params);
  if (result.Items.length === 0) {
    throw new Error("User not found");
  }

  const userToUpdate = result.Items[0];

  const putParams = {
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      userId: userToUpdate.userId,
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
  console.log({user});
  return userToUpdate;
}

export default updateUser;