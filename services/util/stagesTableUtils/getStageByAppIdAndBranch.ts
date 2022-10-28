import dynamodb from "../templates/dynamodb";

const getStageByAppIdAndBranch = async ({ appId, stageBranch }) => {
  try {
    const params = {
      TableName: process.env.STAGES_TABLE_NAME,
      IndexName: "branchIndex",
      KeyConditionExpression: "appId = :appId and stageBranch = :stageBranch",
      ExpressionAttributeValues: {
        ":appId" : appId,
        ":stageBranch": stageBranch,
      },
    };

    const result = await dynamodb.query(params);

    return result.Items[0];
  } catch(e) {
    throw e;
  }
}


export default getStageByAppIdAndBranch;