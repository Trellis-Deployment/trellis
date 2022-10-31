import handler from "../util/templates/handler";
import setStageBranch from '../util/stagesTableUtils/setStageBranch';

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;
  const { stageId, branchName } = data;
  console.log({stageId, branchName});
  try {
    const updatedStage = await setStageBranch({ stageId, branchName });
    return "updated";
  } catch(e) {
    console.log(e.message);
    return e.message;
  }
});
// pass in stage and branchname