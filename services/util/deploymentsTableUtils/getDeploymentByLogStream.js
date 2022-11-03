import dynamodb from "../templates/dynamodb";

const getDeploymentByLogStream = async (logStream) => {
  const putParams = {
    TableName: process.env.DEPLOYMENTS_TABLE_NAME,
  };
  try {
    const deployments = await dynamodb.scan(putParams);
    const deployment = deployments.Items.find(deployment => {
      return deployment.logStream === logStream;
    });
    if (!deployment) {
      throw new Error(`deployment for the log stream ${logStream} not found`);
    }
    return deployment;
  } catch(e) {
    console.log(e.message);
    throw e;
  }
}

export default getDeploymentByLogStream;