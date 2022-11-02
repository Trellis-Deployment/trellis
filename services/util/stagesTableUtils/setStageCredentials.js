import dynamodb from "../templates/dynamodb";

const setStageCredentials = async (stageId, newCredentials) => {
  const updateParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId: stageId,
    },
    UpdateExpression: "SET IAMCredentialsLocation = :newCredentials",
    ExpressionAttributeValues: { ":newCredentials": newCredentials },
  };

  try {
    const stage = await dynamodb.update(updateParams);
    return stage;
  } catch (e) {
    console.log({ err: e.message });
    throw new Error(`Error setting new credentials`, e.message);
  }
};

export default setStageCredentials;
