import dynamodb from "../templates/dynamodb";

const getStageByAppIdAndStageName = async ({ appId, stageName }) => {
  try{
    const params = {
      TableName: process.env.STAGES_TABLE_NAME,
      IndexName: "nameIndex",
      KeyConditionExpression: "appId = :appId and stageName = :stageName",
      ExpressionAttributeValues: {
        ":appId" : appId,
        ":stageName": stageName,
      },
    };

    const result = await dynamodb.query(params);

    return result.Items[0];
  } catch(e) {
    throw e;
  }
}


export default getStageByAppIdAndStageName;