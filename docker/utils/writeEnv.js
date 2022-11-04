import {execSync} from "child_process";
import getRawSecret from "./getSecret";

const writeEnv = async (AWS_ENV_KEY, region, GITHUB_REPO) => {
  if (AWS_ENV_KEY === "") {
    console.log("SKIPPED: NO ENV FILE WRITTEN");
    return
  }
  let envString = await getRawSecret(AWS_ENV_KEY, region)

  let envObject = JSON.parse(envString);

  if (!envObject) {
    console.log("SKIPPED: NO ENV FILE WRITTEN");
    return;
  }

  const writeEnvCommands = ["cd ~/repos", `cd ${GITHUB_REPO}`, `touch .env`];
  Object.entries(envObject).forEach(([key, value]) => {
    writeEnvCommands.push(`echo ${key} = ${value} >> .env`);
  });
  execSync(writeEnvCommands.join(" && "), {stdio: "inherit"});
  console.log("SUCCESS: ENV FILE WRITTEN");
};

export default writeEnv
