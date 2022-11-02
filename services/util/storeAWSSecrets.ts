import {
  SecretsManagerClient,
  CreateSecretCommand,
} from "@aws-sdk/client-secrets-manager";

export interface StoreSecretParams {
  region: string;
  secretName: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export const storeAWSSecrets = async (params: StoreSecretParams) => {
  const region: string = params.region;
  const secret_name: string = params.secretName;
  const accessKeyId: string = params.accessKeyId;
  const secretAccessKey: string = params.secretAccessKey;

  const client = new SecretsManagerClient({
    region,
  });

  try {
    await client.send(
      new CreateSecretCommand({
        Name: secret_name,
        SecretString: JSON.stringify({
          "iam-number": accessKeyId,
          "iam-code": secretAccessKey,
        }),
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  return "Secret successfully stored";
};
