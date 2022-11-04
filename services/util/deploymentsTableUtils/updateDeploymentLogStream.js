import dynamodb from "../templates/dynamodb";

const updateDeploymentLogStream = async (deployment, logStream) => {
  const putParams = {
    TableName: process.env.DEPLOYMENTS_TABLE_NAME,
    Key: {
      deploymentId: deployment.deploymentId,
    },
    UpdateExpression: "SET logStream = :logStream",
    ExpressionAttributeValues: {
      ":logStream": logStream,
    }
  }

  try {
    await dynamodb.update(putParams);
  } catch(e) {
    throw new Error(e.message);
  }

  return "updated";
}

export default updateDeploymentLogStream;