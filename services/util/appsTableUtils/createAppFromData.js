import { v4 as uuidv4 } from "uuid";
import dynamodb from "../templates/dynamodb";
import getAppByRepoName from "./getAppByRepoName";

const createAppFromData = async (data) => {
  let createdApp;
  try {
   createdApp = await getAppByRepoName(data.repoName);
  } catch(e) {
    console.log(e.message);
  }

  if (createdApp) {
    console.log(`${data.repoName} is already tied to ${createdApp.appName} app`);
    return {message: `${data.repoName} is already tied to ${createdApp.appName} app`, new: false};
  }

  const appId = uuidv4();
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    Item: {
      appId,
      appName: data.appName,
      userId: data.userId,
      description: data.description,
      repoName: data.repoName,
      defaultIAMCredentialsLocation: data.defaultIAMCredentialsLocation,
    },
  };

  const result = await dynamodb.put(params);
  return params.Item;
};

export default createAppFromData;

