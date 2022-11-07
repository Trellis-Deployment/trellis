import dynamoDb from "../templates/dynamodb";

const deleteStage = async (stageId) => {
  const params = {
    TableName: process.env.STAGES_TABLE_NAME,
    Key: {
      stageId
    }
  };

  try {
    const data = await dynamoDb.delete(params);
    console.log({data});
  } catch(e) {
    console.log(e.message);
    throw e;
  }
}

export default deleteStage;