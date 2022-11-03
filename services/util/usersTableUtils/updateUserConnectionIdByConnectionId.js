import dynamodb from "../templates/dynamodb";
import updateUserConnectionIdByUserId from "./updateUserConnectionIdByUserId";

const updateUserConnectionIdByConnectionId = async (connectionId) => {
  const putParams = {
    TableName: process.env.USERS_TABLE_NAME,
  };
  try {
    const users = await dynamodb.scan(putParams);
    const user = users.Items.find(user => user.connectionId === connectionId);
    if(!user) {
      return;
    }
    await updateUserConnectionIdByUserId({userId: user.userId, connectionId: "<null>"});
  } catch(e) {
    console.log(e.message);
    throw e;
  }
  return "updated";
}

export default updateUserConnectionIdByConnectionId;