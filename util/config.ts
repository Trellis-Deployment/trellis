import dotenv from "dotenv";
dotenv.config();

const Client_ID = process.env.Client_ID;
const Client_secret = process.env.Client_secret;
const GitHubApp = process.env.GitHubApp;
const Version = process.env.Version;
const Region = process.env.Region;

const config = {
  Client_ID,
  Client_secret,
  GitHubApp,
  Version,
  Region,
};

export default config;