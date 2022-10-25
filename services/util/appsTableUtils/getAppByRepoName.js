import dynamodb from "../templates/dynamodb";

const getAppByRepoName = async (repoName) => {
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    IndexName: "repoIndex",
    KeyConditionExpression: "repo = :repo",
    ExpressionAttributeValues: {
      ":repo" : repoName,
    },
  };

  const result = await dynamodb.query(params);
  return result.Items;
}


export default getAppByRepoName;