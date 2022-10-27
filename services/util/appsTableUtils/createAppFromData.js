import { v4 as uuidv4 } from "uuid";
import dynamodb from "../templates/dynamodb";

const createAppFromData = async (data) => {
  const appId = uuidv4();
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    Item: {
      appId,
      appName: data.appName,
      userId: data.userId,
      description: data.description,
      repoName: data.repoName,
      defaultIAMAccessKey: data.defaultIAMAccessKey,
      defaultIAMSecretKey: data.defaultIAMSecretKey,
    }
  };


  const result = await dynamodb.put(params);
  return params.Item;
}

export default createAppFromData;