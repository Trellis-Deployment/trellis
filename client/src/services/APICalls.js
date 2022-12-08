import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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

const getApps = async (userId) => {
  const response = await axios.get(`${API_URL}/apps?user=${userId}`);
  return response.data;
};

const getApp = async(appId) => {
  const response = await axios.get(`${API_URL}/app/${appId}`);
  return response.data;
}

const postApps = async (app) => {
  const response = await axios.post(`${API_URL}/apps`, app);
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

const getRepoBranches = async ({ userId, appId }) => {
  const response = await axios.get(
    `${API_URL}/repoBranches?userId=${userId}&appId=${appId}`
  );
  return response.data;
};

const teardown = async({ userId, appId, stageId, commitId }) => {
  const response = await axios.post(`${API_URL}/teardown`, { userId, appId, stageId, commitId });
  return response
}

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
const setStageNPMCommand = async ({ stageId, npmScriptName }) => {
  const response = await axios.put(`${API_URL}/npmScriptName`, {
    stageId,
    npmScriptName,
  });
  return response;  
}

const putApp = async(app) => {
  const response = await axios.put(`${API_URL}/app/${app.appId}`, app);
  return response.data;
}

const getUsers = async() => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
}

const createStage = async(stage) => {
  const response = await axios.post(`${API_URL}/stage`, stage);
  return response;
}

const deleteStage = async(stageId) => {
  const response = await axios.delete(`${API_URL}/stage/${stageId}`);
  return response.data;
}

const deleteApp = async(appId) => {
  const response = await axios.delete(`${API_URL}/app/${appId}`);
  return response.data;
}

const toggleIsUnitTestRequired = async ({ stageId, isUnitTestRequired }) => {
  const response = await axios.put(`${API_URL}/stageUnitTest`, {
    stageId,
    isUnitTestRequired,
  });
  return response;
}

const APICalls = {
  getRepos,
  getApp,
  getApps,
  postApps,
  signup,
  signin,
  getStages,
  buildStage,
  getDeployments,
  promoteStage,
  getRepoBranches,
  setStageBranch,
  teardown,
  setStageIamCredentials,
  setStageEnvVariables,
  putApp,
  setStageNPMCommand,
  getUsers,
  createStage,
  deleteStage,
  deleteApp,
  toggleIsUnitTestRequired,

};

export default APICalls;