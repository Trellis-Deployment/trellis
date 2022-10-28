import dynamodb from "../templates/dynamodb";

const getStageById = async (stageId) => {
  const params = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId
    }
  };

  const result = await dynamodb.get(params);
  return result.Item;
}

export default getStageById;

