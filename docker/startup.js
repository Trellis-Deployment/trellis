const { execSync } = require('child_process');
const GITHUB_X_ACCESS_TOKEN = process.env.GITHUB_X_ACCESS_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const STAGE_NAME = process.env.STAGE_NAME;

const awsCredentialCommands = [
  'mkdir -p ~/.aws',
  'touch ~/.aws/credentials',
  'echo [default] >> ~/.aws/credentials',
  `echo AWS_ACCESS_KEY_ID = ${AWS_ACCESS_KEY_ID} >> ~/.aws/credentials`,
  `echo AWS_SECRET_ACCESS_KEY = ${AWS_SECRET_ACCESS_KEY} >> ~/.aws/credentials`,
  'cat ~/.aws/credentials',
];
execSync(awsCredentialCommands.join(' && '), { stdio: 'inherit' });
console.log('SUCCESS: AWS CREDENTIALS STORED');

const cloneRepoCommands = [
  'apk add git',
  'mkdir -p ~/repos',
  'cd ~/repos',
  `git clone https://x-access-token:${GITHUB_X_ACCESS_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git`,
  `cd ${GITHUB_REPO}`,
];
execSync(cloneRepoCommands.join(' && '), { stdio: 'inherit' });
console.log("SUCCESS: REPO CLONED");
  
const dependencyCommands = [
  `cd ~/repos/${GITHUB_REPO}`,
  'npm install',
];
execSync(dependencyCommands.join(' && '), { stdio: 'inherit' });
console.log('SUCCESS: NODE PACKAGE DEPENDENCIES INSTALLED');

const deployCommands = [
  `cd ~/repos/${GITHUB_REPO}`,
  `npx sst deploy --stage ${STAGE_NAME}`,
];
execSync(deployCommands.join(' && '), { stdio: 'inherit' });
console.log('SUCCESS: APP DEPLOYED!');