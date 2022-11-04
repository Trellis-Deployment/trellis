import handler from "../util/templates/handler";
import setStageBranch from '../util/stagesTableUtils/setStageBranch';

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;
  const { stageId, branch } = data;

  try {
    await setStageBranch({ stageId, branch });
    return JSON.stringify({ stageBranch: branch});
  } catch(e) {
    console.log("error in setStageBranch handler:", e.message);
    return e.message;
  }
});


