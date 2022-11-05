import dynamodb from "../templates/dynamodb";

const getAppsByUserId = async (userId) => {
  const scanParams = {
    TableName: process.env.APPS_TABLE_NAME,
  };
  let userApps = [];
  try {
    const apps = await dynamodb.scan(scanParams);
    apps.Items.forEach(app => {
      if (app.users.find(appUserId => appUserId === userId)) {
        userApps.push(app);
      }
    });
    return userApps;
  } catch(e) {
    console.log(e.message);
    throw e;
  }
}

export default getAppsByUserId;