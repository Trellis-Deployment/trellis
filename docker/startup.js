import writeAWSCredentials from './utils/writeAWSCredentials';
import cloneRepo from './utils/cloneRepo';
import executeBuildOrTeardown from './utils/executeBuildOrTeardown';
import writeEnv from './utils/writeEnv';

const ACTION = process.env.ACTION;
const GITHUB_X_ACCESS_TOKEN = process.env.GITHUB_X_ACCESS_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const STAGE_NAME = process.env.STAGE_NAME;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;
const COMMIT_ID = process.env.COMMIT_ID || "";
const AWS_SSM_KEY = process.env.AWS_SSM_KEY;
const AWS_ENV_KEY = process.env.AWS_ENV_KEY;
const REGION = process.env.REGION;

console.log({DEPLOYMENT_ID});

try {
  await writeAWSCredentials(AWS_SSM_KEY, REGION);
  cloneRepo(GITHUB_REPO, GITHUB_X_ACCESS_TOKEN, GITHUB_USER, COMMIT_ID)
  executeBuildOrTeardown(GITHUB_REPO, STAGE_NAME, ACTION)
  await writeEnv(AWS_ENV_KEY, REGION, GITHUB_REPO)
} catch (e) {
  console.log(`error: ${e.message}`);
}
