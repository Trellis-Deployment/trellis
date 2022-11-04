import {
  SecretsManagerClient,
  CreateSecretCommand,
  UpdateSecretCommand,
} from "@aws-sdk/client-secrets-manager";

export interface StoreEnvParams {
  region: string;
  secretName: string;
  envJSONString: string;
  update: boolean;
}

const ACCOUNT = process.env.ACCOUNT;

export const main = async (event: StoreEnvParams) => {
  const region = event.region;
  const secretName = event.secretName;
  const envJSONString = event.envJSONString;
  const update = event.update;

  const client = new SecretsManagerClient({
    region,
  });

  try {
    if (!update) {
      await client.send(
        new CreateSecretCommand({
          Name: secretName,
          SecretString: envJSONString,
        })
      );
    } else {
      await client.send(
        new UpdateSecretCommand({
          SecretId: `arn:aws:secretsmanager:${region}:${ACCOUNT}:secret:${secretName}`,
          SecretString: envJSONString,
        })
      );
    }
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  return "Env secret successfully stored";
};
