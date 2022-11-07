import dynamoDb from "../templates/dynamodb";

const deleteApp = async (userId, appId) => {
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    Key: {
      userId,
      appId
    }
  };

  try {
    const data = await dynamoDb.delete(params);
    console.log("app");
  } catch(e) {
    console.log(e.message);
    throw e;
  }
}

export default deleteApp;