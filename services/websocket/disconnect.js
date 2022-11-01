import updateUserConnectionIdByUserId from "../util/usersTableUtils/updateUserConnectionIdByUserId";
export const handler = async (event) => {
  const userId = event.requestContext.disconnectReason;
  const connectionId = event.requestContext.connectionId;
  console.log({userId});
  console.log({connectionId});
  updateUserConnectionIdByUserId({userId, connectionId: "<null>"});
  return { statusCode: 200, body: "Disconnected" };
};