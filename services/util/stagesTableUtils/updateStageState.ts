import dynamodb from "../templates/dynamodb";

const updateStageState = async ({ stage, state }) => {
  const time = (new Date()).getTime();
  const updateParams = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId: stage.stageId,
    },
    UpdateExpression: state === "deployed" ? "SET stageState = :stageState, lastDeploymentTime = :lastDeploymentTime" : "SET stageState = :stageState",
    ExpressionAttributeValues: state === "deployed" ? 
      {
        ":stageState": state,
        ":lastDeploymentTime": time,
      } :
      {
        ":stageState": state,
      },
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