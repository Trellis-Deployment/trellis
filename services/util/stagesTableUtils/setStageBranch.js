import dynamodb from "../templates/dynamodb";

const setStageBranch = async ({ stageId, branch }) => {
  const updateParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId: stageId,
    },
    UpdateExpression: "SET stageBranch = :stageBranch",
    ExpressionAttributeValues: { ":stageBranch": branch },
  };

  try {
    const stage = await dynamodb.update(updateParams);
    return stage;
  } catch(e) {
    console.log({err: e.message});
    throw new Error(`Error setting git branch. stageId: ${stageId}: `, e.message);
  }
}

export default setStageBranch;