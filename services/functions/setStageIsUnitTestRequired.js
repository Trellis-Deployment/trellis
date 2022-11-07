import handler from "../util/templates/handler";
import setStageIsUnitTestRequired from '../util/stagesTableUtils/setStageIsUnitTestRequired';

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;
  const { stageId, isUnitTestRequired } = data;

  try {
    await setStageIsUnitTestRequired({ stageId, isUnitTestRequired });
    return JSON.stringify({ isUnitTestRequired });
  } catch(e) {
    console.log("error in toggleStageUnitTests handler:", e.message);
    return e.message;
  }
});