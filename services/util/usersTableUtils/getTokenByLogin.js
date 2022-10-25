import dynamodb from "../templates/dynamodb"

const getTokenByLogin = async (login) => {
  const params = {
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      login: login,
    },
  };

  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error("User not found");
  }
  
  return result.Item.userToken;
}

export default getTokenByLogin;