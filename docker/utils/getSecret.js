import {SecretsManagerClient} from "@aws-sdk/client-secrets-manager"

const getRawSecret = async (secretId, region) => {
  const client = new SecretsManagerClient({
    region,
  });
  const command = {
    SecretId: secretId
  }
  try {
    const data = await client.send(command)
  } catch (e) {
    throw e
  }
}

export default getRawSecret;
