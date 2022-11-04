const { writeEnv } = require("./utils/writeEnv");
const { execSync } = require("child_process");
const {
  readdirSync,
  existsSync,
  readFileSync,
  promises: fsPromises,
} = require("fs");
const AWS = require("aws-sdk");

const ACTION = process.env.ACTION;
const GITHUB_X_ACCESS_TOKEN = process.env.GITHUB_X_ACCESS_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const STAGE_NAME = process.env.STAGE_NAME;
const APP_NAME = process.env.APP_NAME;
const SET_STATUS_URL = process.env.SET_STATUS_URL;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;
const COMMIT_ID = process.env.COMMIT_ID || "";
const AWS_SSM_KEY = process.env.AWS_SSM_KEY;
const AWS_SSM_ENV = process.env.AWS_SSM_ENV || "";
const REGION = process.env.REGION;

console.log({ DEPLOYMENT_ID });
const statusData = {
  GITHUB_USER,
  STAGE_NAME,
  APP_NAME,
  DEPLOYMENT_ID,
};

let envObject = undefined;
function processDeploy(err, data) {
  try {
    if (err) {
      console.log(err);
      if (err.code === "DecryptionFailureException")
        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InternalServiceErrorException")
        // An error occurred on the server side.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InvalidParameterException")
        // You provided an invalid value for a parameter.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InvalidRequestException")
        // You provided a parameter value that is not valid for the current state of the resource.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "ResourceNotFoundException")
        // We can't find the resource that you asked for.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
    }
    const parsed = JSON.parse(data.SecretString);
    const AWS_ACCESS_KEY_ID = parsed["iam-number"];
    const AWS_SECRET_ACCESS_KEY = parsed["iam-code"];

    const awsCredentialCommands = [
      "mkdir -p ~/.aws",
      "touch ~/.aws/credentials",
      "echo [default] >> ~/.aws/credentials",
      `echo aws_access_key_id = ${AWS_ACCESS_KEY_ID} >> ~/.aws/credentials`,
      `echo aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY} >> ~/.aws/credentials`,
    ];
    execSync(awsCredentialCommands.join(" && "), { stdio: "inherit" });
    console.log("SUCCESS: AWS CREDENTIALS STORED");

    const cloneRepoCommands = [
      "apk add git",
      "mkdir -p ~/repos",
      "cd ~/repos",
      `git clone https://x-access-token:${GITHUB_X_ACCESS_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git`,
      `cd ${GITHUB_REPO}`,
    ];
    if (COMMIT_ID !== "") {
      cloneRepoCommands.push(`git checkout ${COMMIT_ID}`);
    }
    execSync(cloneRepoCommands.join(" && "), { stdio: "inherit" });
    console.log("SUCCESS: REPO CLONED");

    writeEnv(envObject, GITHUB_REPO);

    const dependencyCommands = [`cd ~/repos/${GITHUB_REPO}`, "npm install"];
    execSync(dependencyCommands.join(" && "), { stdio: "inherit" });
    console.log("SUCCESS: NODE PACKAGE DEPENDENCIES INSTALLED");

    const deployCommands = [
      `cd ~/repos/${GITHUB_REPO}`,
      `npx sst deploy --stage ${STAGE_NAME}`,
    ];
    const teardownCommands = [
      `cd ~/repos/${GITHUB_REPO}`,
      `npx sst remove --stage ${STAGE_NAME}`,
    ];
    const actionCommands =
      ACTION === "deploy" ? deployCommands : teardownCommands;
    execSync(actionCommands.join(" && "), { stdio: "inherit" });

    console.log(
      ACTION === "deploy"
        ? "SUCCESS: APP DEPLOYED!"
        : "SUCCESS: APP TEARDOWN COMPLETE!"
    );
  } catch (e) {
    console.log(`error: ${e.message}`);
  }
}

try {
  const client = new AWS.SecretsManager({
    region: REGION,
  });
  if (AWS_SSM_ENV !== "") {
    client.getSecretValue({ SecretId: AWS_SSM_ENV }, (err, data) => {
      if (err) {
        console.log(err);
        if (err.code === "DecryptionFailureException")
          // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
        else if (err.code === "InternalServiceErrorException")
          // An error occurred on the server side.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
        else if (err.code === "InvalidParameterException")
          // You provided an invalid value for a parameter.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
        else if (err.code === "InvalidRequestException")
          // You provided a parameter value that is not valid for the current state of the resource.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
        else if (err.code === "ResourceNotFoundException")
          // We can't find the resource that you asked for.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
      }

      envObject = JSON.parse(data.SecretString);
      client.getSecretValue({ SecretId: AWS_SSM_KEY }, processDeploy);
    });
  } else {
    client.getSecretValue({ SecretId: AWS_SSM_KEY }, processDeploy);
  }
} catch (e) {
  console.log(`error: ${e.message}`);
  statusData.STATE = "error";
}
