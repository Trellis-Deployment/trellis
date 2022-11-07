import handler from "../util/templates/handler";
import deleteStage from "../util/stagesTableUtils/deleteStage";

export const main = handler(async (event) => {
  const stageId = await event['pathParameters']['stageId'];
  try {
    const data = await deleteStage(stageId);
    return(data);
  } catch(e) {
    console.log(e.message);
    throw e;
  }
});