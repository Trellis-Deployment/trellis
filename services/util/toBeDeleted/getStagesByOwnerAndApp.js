import dynamodb from "../templates/dynamodb";

const getStagesByOwnerAndApp = async ({userId, appName}) => {
  const appParams = {
    TableName: process.env.APPS_TABLE_NAME,
    IndexName: "appNameIndex",
    KeyConditionExpression: `userId = :userId and appName = :appName`,
    ExpressionAttributeValues: {
      ":userId" : userId,
      ":appName" : appName
    }
  };

  let app;
  try {
    app = ((await dynamodb.query(appParams)).Items)[0];
  } catch(e) {
    console.log(e.message);
    throw new Error(`{dynamodb:"failed to get app"}`);
  }

  const stagesParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    IndexName: "branchIndex",
    KeyConditionExpression: "appId = :appId",
    ExpressionAttributeValues: {
      ":appId": app.appId,
    },
  };
  
  let result;
  try {
    result = await dynamodb.query(stagesParams);
  } catch(e) {
    throw e;
  }
  return result.Items;
}

export default getStagesByOwnerAndApp;