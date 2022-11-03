import dynamodb from "../templates/dynamodb";

const setUserGithubTokens = async ({userId, accessToken, refreshToken}) => {
  const putParams = {
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      userId: userId,
    },
    UpdateExpression: "SET userToken = :userToken, refreshToken = :refreshToken",
    ExpressionAttributeValues: {
      ":userToken": accessToken,
      ":refreshToken": refreshToken,
    },
  };

  try {
    const user = await dynamodb.update(putParams);
    return user
  } catch(e) {
    throw new Error(e.message);
  }
}

export default setUserGithubTokens