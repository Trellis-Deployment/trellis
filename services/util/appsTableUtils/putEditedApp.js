import dynamodb from "../templates/dynamodb";

const putEditedApp = async (app) => {
  const putParams = {
    TableName: process.env.APPS_TABLE_NAME,
    Item: app,
  };
  try {
    const newApp = await dynamodb.put(putParams);
    return newApp;
  } catch(e) {
    console.log(e.message);
    throw e;
  }
}

export default putEditedApp;