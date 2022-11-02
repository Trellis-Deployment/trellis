import handler from "../util/templates/handler";
import { storeAWSSecrets, StoreSecretParams } from "../util/storeAWSSecrets";
import { v4 as uuidv4 } from "uuid";

const REGION = process.env.REGION;

export const main = handler(async (event, context) => {
  let secretName = event.secretName || "trellis/" + uuidv4();

  const secretData: StoreSecretParams = {
    region: REGION,
    secretName: secretName,
    accessKeyId: event.accessKeyId,
    secretAccessKey: event.secretAccessKey,
  };

  try {
    await storeAWSSecrets(secretData);
    return secretName;
  } catch (err) {
    console.log("Failure to create app credential secret");
    throw err;
  }
});
