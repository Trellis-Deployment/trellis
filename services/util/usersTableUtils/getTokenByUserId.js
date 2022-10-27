import dynamodb from "../templates/dynamodb"

const getTokenByUserId = async (userId) => {
  const params = {
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      userId: userId,
    },
  };

  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error("User not found");
  }
  
  return result.Item.userToken;
}

export default getTokenByUserId;