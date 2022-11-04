import {execSync} from 'child_process';

const cloneRepo = async (GITHUB_REPO, GITHUB_X_ACCESS_TOKEN, GITHUB_USER, COMMIT_ID) => {
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
  execSync(cloneRepoCommands.join(" && "), {stdio: "inherit"});
  console.log("SUCCESS: REPO CLONED");
}

export default cloneRepo
