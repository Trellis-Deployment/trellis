import dynamodb from "../templates/dynamodb";

const getDeploymentsByStageId = async (stageId) => {
  const deploymentsParams = {
    TableName: process.env.DEPLOYMENTS_TABLE_NAME,
    IndexName: "stageIndex",
    KeyConditionExpression: "stageId = :stageId",
    ExpressionAttributeValues: {
      ":stageId": stageId,
    },
  };
  
  let result;
  try {
    result = await dynamodb.query(deploymentsParams);
  } catch(e) {
    throw e;
  }
  return result.Items;
}

export default getDeploymentsByStageId;