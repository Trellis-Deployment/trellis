import dynamodb from "../templates/dynamodb";

const getStageById = async (stageId) => {
  const params = {
    TableName: process.env.STAGES_TABLE_NAME,
    IndexName: "idIndex",
    KeyConditionExpression: "stageId = :stageId",
    ExpressionAttributeValues: {
      ":stageId": stageId,
    },
  };

  const result = await dynamodb.query(params);
  return result.Items[0];
}

export default getStageById;

