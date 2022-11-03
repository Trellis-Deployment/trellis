import dynamodb from "../templates/dynamodb"

const readDB = async (params) => {
  const promise = dynamodb.scan(params);
  const result = await promise;
  let data = result.Items;
  if (result.LastEvaluatedKey) {
    params.ExclusiveStartKey = result.LastEvaluatedKey;
    data = data.concat(await readDB(params));
  }
  return data;
}

const getAllUsers = async () => {
  const params = {
    TableName: process.env.USERS_TABLE_NAME,
  };

  const users = await readDB(params);
  return users
}

export default getAllUsers;