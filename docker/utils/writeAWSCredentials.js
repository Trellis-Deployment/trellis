import getRawSecret from "./getSecret";
import {execSync} from 'child_process';

const writeAWSCredentials = async (secretId, region) => {
  const credSecret = await getRawSecret(secretId, region);
  const parsedAWSCredentials = JSON.parse(credSecret);
  const AWS_ACCESS_KEY_ID = parsedAWSCredentials["iam-number"];
  const AWS_SECRET_ACCESS_KEY = parsedAWSCredentials["iam-code"];

  const awsCredentialCommands = [
    "mkdir -p ~/.aws",
    "touch ~/.aws/credentials",
    "echo [default] >> ~/.aws/credentials",
    `echo aws_access_key_id = ${AWS_ACCESS_KEY_ID} >> ~/.aws/credentials`,
    `echo aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY} >> ~/.aws/credentials`,
  ];
  execSync(awsCredentialCommands.join(" && "), {stdio: "inherit"});
  console.log("SUCCESS: AWS CREDENTIALS STORED");

}

export default writeAWSCredentials
