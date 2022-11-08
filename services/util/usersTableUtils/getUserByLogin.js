import dynamodb from "../templates/dynamodb";

const getUserByLogin = async (login) => {
  const params = {
    TableName: process.env.USERS_TABLE_NAME,
    IndexName: "loginIndex",
    KeyConditionExpression: "githubLogin = :githubLogin",
    ExpressionAttributeValues: {
      ":githubLogin": login,
    },
  };
  try {
    const result = await dynamodb.query(params);
    return result.Items[0];
  } catch(e) {
    throw e;
  }
  
}

export default getUserByLogin;