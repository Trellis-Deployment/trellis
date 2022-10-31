import dynamodb from "../templates/dynamodb";

const getDeploymentById = async (deploymentId) => {
  const params = {
    TableName: process.env.DEPLOYMENTS_TABLE_NAME,
    Key: {
      deploymentId
    }
  };

  const result = await dynamodb.get(params);
  return result.Item;
}

export default getDeploymentById;

