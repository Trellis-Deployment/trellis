import { v4 as uuidv4 } from "uuid";
import dynamodb from "../templates/dynamodb";

const createAppFromData = async (data) => {
  const appId = uuidv4();
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    Item: {
      appId,
      appName: data.name,
      ownerLogin: data.user,
      appState: "App Created",
      description: data.description,
      repo: data.repo,
      IAMAccessKey: data.accessKey,
      IAMSecretKey: data.secretKey,
    }
  };


  const result = await dynamodb.put(params);
  return params.Item;
}

export default createAppFromData;