import handler from "../util/templates/handler";
import getStageById from '../util/stagesTableUtils/getStageById';

export const main = handler(async (event) => {
  const stageId = event["queryStringParameters"]['stageId'];
  try {
    const stage = await getStageById(stageId);
    return ({state: stage.stageState});
  } catch(e) {
    console.log(e.message);
    return({error: e.message});
  }

});