import { ApiGatewayManagementApi } from "aws-sdk";
import getUserById from "../util/usersTableUtils/getUserById";

export const handler = async (event) => {
  const {url, updatedStages, userId} = event;
  const withoutWSS = url.split('//')[1];
  const apiG = new ApiGatewayManagementApi({
    endpoint: `${withoutWSS}`,
  });
  const user = await getUserById(userId);
  if (user.connectionId === '<null>') {
    console.log("no open websocket connection");
    return { statusCode: 200, body: "Message not sent" };
  }
  
  try {
    await apiG
      .postToConnection({ ConnectionId: user.connectionId, Data: JSON.stringify(updatedStages) })
      .promise();
    console.log("message sent");
  } catch (e) {
    console.log(e.message);
    return { statusCode: 401, body: "Message not sent" };
  }

  return { statusCode: 200, body: "Message sent" };
};