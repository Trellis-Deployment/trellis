import dynamodb from "../templates/dynamodb";

const updateAppWithHookId = async (app, hookId) => {
  const updateParams = {
    TableName: process.env.APPS_TABLE_NAME,
    Key: {
      userId: app.userId,
      appId: app.appId,
    },
    UpdateExpression: "SET hookId = :hookId ",
    ExpressionAttributeValues: {
      ":hookId": hookId,
    }
  }

  try {
    await dynamodb.update(updateParams);
  } catch(e) {
    throw e;
  }

  return "updated";
}

export default updateAppWithHookId;