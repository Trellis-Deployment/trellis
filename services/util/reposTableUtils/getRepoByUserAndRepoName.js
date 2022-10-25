import dynamodb from "../templates/dynamodb";

const getRepoByUserAndRepoName = async ({ user, repoName }) => {
  console.log({user, repoName});
  const params = {
    TableName: process.env.REPOS_TABLE_NAME,
    Key: {
      userLogin: user,
      repoName: repoName,
    },
  };

  const result = await dynamodb.get(params);
  return result.Item;
}


export default getRepoByUserAndRepoName;