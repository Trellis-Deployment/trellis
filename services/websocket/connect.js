import updateUserConnectionIdByUserId from "../util/usersTableUtils/updateUserConnectionIdByUserId";
export const handler = async (event) => {
  const userId = event['queryStringParameters']['userId'];
  const connectionId = event.requestContext.connectionId;
  await updateUserConnectionIdByUserId({userId, connectionId});
  console.log(`Connection established with ${connectionId}`);
  return { statusCode: 200, body: "Connected" };
};