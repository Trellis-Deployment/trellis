import updateUserConnectionIdByConnectionId from "../util/usersTableUtils/updateUserConnectionIdByConnectionId";
export const handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  console.log(`websocket connection closed with ${connectionId}`);
  await updateUserConnectionIdByConnectionId(connectionId);
  return { statusCode: 200, body: "Disconnected" };
};