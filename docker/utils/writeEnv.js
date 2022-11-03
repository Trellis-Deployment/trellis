const { execSync } = require("child_process");

const writeEnv = (envObject, GITHUB_REPO) => {
  if (!envObject) {
    return;
  }

  const writeEnvCommands = ["cd ~/repos", `cd ${GITHUB_REPO}`, `touch .env`];
  Object.entries(envObject).forEach(([key, value]) => {
    writeEnvCommands.push(`echo ${key} = ${value} >> .env`);
  });
  execSync(writeEnvCommands.join(" && "), { stdio: "inherit" });
  console.log("SUCCESS: ENV FILE WRITTEN");
};

module.exports = {
  writeEnv,
};
