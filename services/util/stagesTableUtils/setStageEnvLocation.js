import dynamodb from "../templates/dynamodb";

const setStageEnvLocation = async (stageId, envLocation) => {
  const updateParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId: stageId,
    },
    UpdateExpression: "SET envLocation = :envLocation",
    ExpressionAttributeValues: { ":envLocation": envLocation },
  };

  try {
    const stage = await dynamodb.update(updateParams);
    return stage;
  } catch (e) {
    console.log({ err: e.message });
    throw new Error(`Error setting new envLocation`, e.message);
  }
};

export default setStageEnvLocation;
