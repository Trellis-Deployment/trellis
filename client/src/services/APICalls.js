import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const authenticate = async (code) => {
  const response = await axios.get(`${API_URL}/authenticate?code=${code}`);
  return response.data;
}

const signup = async (code) => {
  const response = await axios.get(`${API_URL}/signup?code=${code}`);
  return response.data;
}

const signin = async (code) => {
  const response = await axios.get(`${API_URL}/signin?code=${code}`);
  return response.data;
}

const getRepos = async (user) => {
  const response = await axios.get(`${API_URL}/repos?user=${user}`);
  return response.data;
}

const buildRepo = async(user, repo) => {
  const response = await axios.get(`${API_URL}/repos/build?user=${user}&repo=${repo}`);
  return response.data;
}

const getApps = async(user) => {
  const response = await axios.get(`${API_URL}/apps?user=${user}`);
  return response.data;
}

const postApps = async(app) => {
  const response = await axios.post(`${API_URL}/apps`, app);
  console.log(response);
  return response.data;
}

const getStages = async(user, appName) => {
  const response = await axios.get(`${API_URL}/stages?user=${user}&appName=${appName}`);
  return response.data;
}

const buildStage = async(build) => {
  const response = await axios.post(`${API_URL}/build`, build);

  return response.data;
}

const APICalls = {
  authenticate,
  getRepos,
  buildRepo,
  getApps,
  postApps,
  signup,
  signin,
  getStages,
  buildStage
}

export default APICalls;