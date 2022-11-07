import dynamodb from "../templates/dynamodb";

const setStageIsUnitTestRequired = async ({ stageId, isUnitTestRequired }) => {
  const updateParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId: stageId,
    },
    UpdateExpression: "SET isUnitTestRequired = :isUnitTestRequired",
    ExpressionAttributeValues: { ":isUnitTestRequired": isUnitTestRequired },
  };

  try {
    const stage = await dynamodb.update(updateParams);
    return stage;
  } catch(e) {
    console.log({err: e.message});
    throw new Error(`Error setting isUnitTestRequired. stageId: ${stageId}: `, e.message);
  }
}

export default setStageIsUnitTestRequired;
