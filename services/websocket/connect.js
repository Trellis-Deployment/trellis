import updateUserConnectionIdByUserId from "../util/usersTableUtils/updateUserConnectionIdByUserId";
export const handler = async (event) => {
  const userId = event['queryStringParameters']['userId'];
  const connectionId = event.requestContext.connectionId;
  console.log({userId});
  console.log({connectionId});
  await updateUserConnectionIdByUserId({userId, connectionId});

  return { statusCode: 200, body: "Connected" };
};