import {execSync} from "child_process"

const executeBuildOrTeardown = (GITHUB_REPO, STAGE_NAME, ACTION) => {
  const dependencyCommands = [`cd ~/repos/${GITHUB_REPO}`, "npm install"];
  execSync(dependencyCommands.join(" && "), {stdio: "inherit"});
  console.log("SUCCESS: NODE PACKAGE DEPENDENCIES INSTALLED");

  const deployCommands = [
    `cd ~/repos/${GITHUB_REPO}`,
    `npx sst deploy --stage ${STAGE_NAME}`,
  ];
  const teardownCommands = [
    `cd ~/repos/${GITHUB_REPO}`,
    `npx sst remove --stage ${STAGE_NAME}`,
  ]
  const actionCommands = ACTION === 'deploy' ? deployCommands : teardownCommands;
  execSync(actionCommands.join(' && '), {stdio: 'inherit'});

  console.log(ACTION === 'deploy' ? 'SUCCESS: APP DEPLOYED!' : 'SUCCESS: APP TEARDOWN COMPLETE!');
}

export default executeBuildOrTeardown;
