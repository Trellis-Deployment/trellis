import dynamodb from "../templates/dynamodb";

const updateDeploymentStateById = async ({ deploymentId, state, logs }) => {
  const time = (new Date()).getTime();
  logs = logs || '';
  const updateParams = {
    TableName: process.env.DEPLOYMENTS_TABLE_NAME,
    Key: {
      deploymentId: deploymentId,
    },
    UpdateExpression: "SET deploymentState = :deploymentState, deployedTime = :deployedTime, logs = :logs ",
    ExpressionAttributeValues:
      {
        ":deploymentState": state,
        ":deployedTime": time,
        ":logs": logs,
      }
  };

  const getParams = {
    TableName: process.env.DEPLOYMENTS_TABLE_NAME,
    Key: {
      deploymentId: deploymentId,
    }
  }

  try {
    await dynamodb.update(updateParams);
    const deployment = await dynamodb.get(getParams);
    return deployment.Item;
  } catch(e) {
    console.log({err: e.message});
    throw new Error(e.message);
  }
}

export default updateDeploymentStateById;