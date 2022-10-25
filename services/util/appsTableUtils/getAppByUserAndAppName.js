import dynamodb from "../templates/dynamodb";

const getAppByUserAndAppName = async ({ user, appName }) => {
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    partitionKey: "ownerLogin", sortKey: "appName",
    KeyConditionExpression: "ownerLogin = :ownerLogin and appName = :appName",
    ExpressionAttributeValues: {
      ":ownerLogin" : user,
      ":appName": appName,
    },
  };

  const result = await dynamodb.query(params);
  return result.Items;
}


export default getAppByUserAndAppName;