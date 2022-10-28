import dynamodb from "../templates/dynamodb";

const getAppsByOwnerId = async (userId) => {
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  const result = await dynamodb.query(params);

  return result.Items;
}


export default getAppsByOwnerId;