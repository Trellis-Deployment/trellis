import dynamodb from "../templates/dynamodb";

const getAppsByOwner = async (login) => {
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    KeyConditionExpression: "ownerLogin = :ownerLogin",
    ExpressionAttributeValues: {
      ":ownerLogin": login,
    },
  };

  const result = await dynamodb.query(params);

  return result.Items;
}


export default getAppsByOwner;