import dynamodb from "../templates/dynamodb";

const updateStageState = async ({ stage, state, commitId }) => {
  const time = (new Date()).getTime();
  const updateParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId: stage.stageId,
    },
    UpdateExpression:"SET stageState = :stageState, lastDeploymentTime = :lastDeploymentTime, lastCommitId = :lastCommitId",
    ExpressionAttributeValues:
      {
        ":stageState": state,
        ":lastDeploymentTime": time,
        ":lastCommitId": commitId,
      }
  };

  try {
    const stage = await dynamodb.update(updateParams);
    
    return stage;
  } catch(e) {
    console.log({err: e.message});
    throw new Error(e.message);
  }
}

export default updateStageState;