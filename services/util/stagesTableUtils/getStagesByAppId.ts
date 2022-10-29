import dynamodb from "../templates/dynamodb";

const getStagesByAppId = async (appId) => {
  const stagesParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    IndexName: "branchIndex",
    KeyConditionExpression: "appId = :appId",
    ExpressionAttributeValues: {
      ":appId": appId,
    },
  };
  
  let result;
  try {
    result = await dynamodb.query(stagesParams);
  } catch(e) {
    throw e;
  }
  return result.Items;
}

export default getStagesByAppId;