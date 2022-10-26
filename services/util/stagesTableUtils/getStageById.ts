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

  console.log({params});

  const result = await dynamodb.query(params);
  console.log({result});
  return result.Items[0];
}

export default getStageById;

