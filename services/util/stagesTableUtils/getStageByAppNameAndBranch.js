import dynamodb from "../templates/dynamodb";

const getStageByAppNameAndBranch = async ({ appId, stageBranch }) => {
  const params = {
    TableName: process.env.STAGES_TABLE_NAME,
    IndexName: "stageIndex",
    KeyConditionExpression: "appId = :appId and stageBranch = :stageBranch",
    ExpressionAttributeValues: {
      ":appId" : appId,
      ":stageBranch": stageBranch,
    },
  };

  const result = await dynamodb.query(params);

  return result.Items;
}


export default getStageByAppNameAndBranch;