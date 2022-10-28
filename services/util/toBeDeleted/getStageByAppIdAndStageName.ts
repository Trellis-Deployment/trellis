import dynamodb from "../templates/dynamodb";

const getStageByAppIdAndStageName = async ({ stageName, appId }) => {
  if(appId) {
    const getParams = {
      TableName: process.env.STAGES_TABLE_NAME,
      Key: {
        appId: appId,
        stageName: stageName,
      }
    };
    try {
      const stage = await dynamodb.get(getParams);
      return stage.Item;
    } catch(e) {
      console.log({err: e.message});
      throw new Error(e.message);
    }
  }
  

}

export default getStageByAppIdAndStageName;