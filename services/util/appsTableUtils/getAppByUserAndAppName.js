import dynamodb from "../templates/dynamodb";

const getAppByUserAndAppName = async ({ userId, appName }) => {
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    IndexName: "appNameIndex",
    KeyConditionExpression: "userId = :userId and appName = :appName",
    ExpressionAttributeValues: {
      ":userId" : userId,
      ":appName": appName,
    },
  };

  const result = await dynamodb.query(params);
  return result.Items[0];
}


export default getAppByUserAndAppName;