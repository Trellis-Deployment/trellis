import dynamodb from "../templates/dynamodb";

const getStagesByOwnerAndApp = async ({ownerLogin, appName}) => {
  const appParams = {
    TableName: process.env.APPS_TABLE_NAME,
    Key: {
      ownerLogin,
      appName,
    },
  };

  let app;
  try {
    app = (await dynamodb.get(appParams)).Item;
  } catch(e) {
    console.log(e.message);
    throw new Error(`{dynamodb:"failed to get app"}`);
  }

  const stagesParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    KeyConditionExpression: "appId = :appId",
    ExpressionAttributeValues: {
      ":appId": app.appId,
    },
  };
  let result;
  try {
    result = await dynamodb.query(stagesParams);
  } catch(e) {
    throw new Error('{dynamodb:"failed to get stages"}');
  }

  return result.Items;
}

export default getStagesByOwnerAndApp;