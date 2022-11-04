import handler from "../util/templates/handler";
import setStageNPMCommand from '../util/stagesTableUtils/setStageNPMCommand';

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;
  const { stageId, npmScriptName } = data;

  try {
    await setStageNPMCommand({ stageId, npmScriptName });
    return JSON.stringify({ npmScriptName: npmScriptName });
  } catch(e) {
    console.log("error in setStageNPMCommand handler:", e.message);
    return e.message;
  }
});