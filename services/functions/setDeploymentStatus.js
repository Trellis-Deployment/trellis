import handler from "../util/templates/handler";
import updateStageStateByAppNameUserAndStageName from "../util/stagesTableUtils/updateStageStateByAppNameUserAndStageName";

export const main = handler(async (event) => {
  const data = event.body ? JSON.parse(event.body) : null;
  console.log({data});
  console.log(data.ERROR);
  updateStageStateByAppNameUserAndStageName({user: data.GITHUB_USER, stageName: data.STAGE_NAME, appName: data.APP_NAME, state: data.STATE});

  return "received";
});