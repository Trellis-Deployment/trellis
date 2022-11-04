import dynamodb from "../templates/dynamodb";

const getAppByAppId = async(appId) => {
  const scanParams = {
    TableName: process.env.APPS_TABLE_NAME,
  }
  try {
    const apps = await dynamodb.scan(scanParams);
    const app = apps.Items.find(app => app.appId === appId);
    if (!app) {
      throw new Error(`Can't find app with appId ${appId}`);
    }

    return app;
  } catch(e) {
    console.log(e.message);
    throw e;
  }
}

export default getAppByAppId;