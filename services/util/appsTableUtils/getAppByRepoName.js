import dynamodb from "../templates/dynamodb";

const getAppByRepoName = async (repoName) => {
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    IndexName: "repoIndex",
    KeyConditionExpression: "repoName = :repoName",
    ExpressionAttributeValues: {
      ":repoName" : repoName,
    },
  };

  const result = await dynamodb.query(params);
  return result.Items[0];
}


export default getAppByRepoName;