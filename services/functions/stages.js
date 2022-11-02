import handler from "../util/templates/handler";
import getStagesByAppId from "../util/stagesTableUtils/getStagesByAppId";

export const main = handler(async (event) => {
  const appId = await event["queryStringParameters"]["appId"];
  try {
    const stages = await getStagesByAppId(appId);
    stages.forEach((stage) => {
      delete stage.IAMCredentialsLocation;
    });
    return stages;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
});

