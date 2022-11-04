import dynamodb from "../templates/dynamodb";

const setStageNPMCommand = async ({ stageId, npmScriptName }) => {
  const updateParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId: stageId,
    },
    UpdateExpression: "SET npmScriptName = :npmScriptName",
    ExpressionAttributeValues: { ":npmScriptName": npmScriptName },
  };

  try {
    const stage = await dynamodb.update(updateParams);
    return stage;
  } catch(e) {
    console.log({err: e.message});
    throw new Error(`Error setting npm command. stageId: ${stageId}: `, e.message);
  }
}

export default setStageNPMCommand;

