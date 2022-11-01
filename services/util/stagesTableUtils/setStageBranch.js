import dynamodb from "../templates/dynamodb";
import githubCalls from "util/github/githubCalls";

const setStageBranch = async ({ stageId, branch, lastCommitId }) => {
  const updateParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId: stageId,
    },
    UpdateExpression: "SET stageBranch = :stageBranch, lastCommitId = :lastCommitId",
    ExpressionAttributeValues: { ":stageBranch": branch, ":lastCommitId": lastCommitId },
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