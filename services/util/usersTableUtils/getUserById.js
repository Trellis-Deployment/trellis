import dynamodb from "../templates/dynamodb"

const getUserByUserId = async (userId) => {
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
  
  return result.Item;
}

export default getUserByUserId;