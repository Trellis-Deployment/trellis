import getAppByUserAndAppName from "../appsTableUtils/getAppByUserAndAppName";
import dynamodb from "../templates/dynamodb";

const updateStageStateByAppNameUserAndStageName = async ({user, stageName, appName, state}) => {
  const apps = (await getAppByUserAndAppName({user, appName}));
  const app = apps ? apps[0] : null;

  if(app) {
    const putParams = {
      TableName: process.env.STAGES_TABLE_NAME,
      Key: {
        appId: app.appId,
        stageName: stageName,
      },
      UpdateExpression: "SET stageState = :stageState",
      ExpressionAttributeValues: {
        ":stageState": state,
      },
    };
    try {
      const stage = await dynamodb.update(putParams);
      return stage;
    } catch(e) {
      console.log({err: e.message});
      throw new Error(e.message);
    }
  }
  

}

export default updateStageStateByAppNameUserAndStageName;