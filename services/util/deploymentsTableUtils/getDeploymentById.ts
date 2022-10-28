import dynamodb from "../templates/dynamodb";

const getDeploymentById = async (deploymentId) => {
  const getParams = {
    TableName: process.env.DEPLOYMENTS_TABLE_NAME,
    Key: {
      deploymentId: deploymentId,
    }
  }

  try {
    const deployment = await dynamodb.get(getParams);
    return deployment.Item;
  } catch(e) {
    console.log({err: e.message});
    throw new Error(e.message);
  }
}

export default getDeploymentById;