import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const authenticate = async (code) => {
  const response = await axios.get(`${API_URL}/authenticate?code=${code}`);
  return response.data;
};

const signup = async (code) => {
  const response = await axios.get(`${API_URL}/signup?code=${code}`);
  return response.data;
};

const signin = async (code) => {
  const response = await axios.get(`${API_URL}/signin?code=${code}`);
  return response.data;
};

const getRepos = async (user) => {
  const response = await axios.get(`${API_URL}/repos?user=${user}`);
  return response.data;
};

const buildRepo = async (user, repo) => {
  const response = await axios.get(
    `${API_URL}/repos/build?user=${user}&repo=${repo}`
  );
  return response.data;
};

const getApps = async (userId) => {
  const response = await axios.get(`${API_URL}/apps?user=${userId}`);
  return response.data;
};

const postApps = async (app) => {
  const response = await axios.post(`${API_URL}/apps`, app);
  console.log(response);
  return response.data;
};

const getStages = async (appId) => {
  const response = await axios.get(`${API_URL}/stages?appId=${appId}`);
  return response.data;
};

const getDeployments = async (stageId) => {
  const response = await axios.get(`${API_URL}/deployments?stageId=${stageId}`);
  return response.data;
};

const buildStage = async (build) => {
  const response = await axios.post(`${API_URL}/build`, build);
  return response.data;
};

const promoteStage = async (build) => {
  const response = await axios.post(`${API_URL}/promote`, build);
  return response.data;
};

const getStageStatus = async ({ stageId }) => {
  const response = await axios.get(`${API_URL}/stageStatus?stageId=${stageId}`);
  return response.data;
};

const getRepoBranches = async ({ userId, appName }) => {
  const response = await axios.get(
    `${API_URL}/repoBranches?userId=${userId}&appName=${appName}`
  );
  return response.data;
};

const teardown = async ({ userId, appName, stageId, commitId }) => {
  const response = await axios.post(`${API_URL}/teardown`, {
    userId,
    appName,
    stageId,
    commitId,
  });
  return response;
};

const setStageBranch = async ({ stageId, branch }) => {
  const response = await axios.put(`${API_URL}/stageBranch`, {
    stageId,
    branch,
  });
  return response;
};

const setStageIamCredentials = async ({
  stageId,
  accessKeyId,
  secretAccessKey,
}) => {
  const response = await axios.post(`${API_URL}/stageCredentials`, {
    stageId,
    accessKeyId,
    secretAccessKey,
  });
  return response;
};

const setStageEnvVariables = async ({ stageId, envJSONString }) => {
  const response = await axios.post(`${API_URL}/stageEnv`, {
    stageId,
    envJSONString,
  });
  return response;
};

const APICalls = {
  authenticate,
  getRepos,
  buildRepo,
  getApps,
  postApps,
  signup,
  signin,
  getStages,
  buildStage,
  getStageStatus,
  getDeployments,
  promoteStage,
  getRepoBranches,
  setStageBranch,
  teardown,
  setStageIamCredentials,
  setStageEnvVariables,
};

export default APICalls;
