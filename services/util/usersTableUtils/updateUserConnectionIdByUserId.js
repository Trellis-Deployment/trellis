import dynamodb from "../templates/dynamodb";

const updateUser = async ({userId, connectionId}) => {
  const putParams = {
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      userId: userId,
    },
    UpdateExpression: "SET connectionId = :connectionId",
    ExpressionAttributeValues: {
      ":connectionId": connectionId,
    },
  };
  let user;
  try {
    user = await dynamodb.update(putParams);
  } catch(e) {
    throw new Error(e.message);
  }
  return "updated";
}

export default updateUser;