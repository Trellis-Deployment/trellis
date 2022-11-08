import axios from "axios";
import { Octokit } from "octokit";

const getAccessToken = async (code) => {
  try {
    const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.Client_ID}&client_secret=${process.env.Client_secret}&code=${code}`);
    return response.data;
  } catch(e) {
    console.log(e.message);
  }
}

const getUserInfo = async (token) => {
  const octokit = new Octokit({
    auth: token
  });
  try {
    const response = await octokit.request('Get /user', {});
    return response.data;
  } catch(e) {
    console.log(e.message);
  }
}

const getReposByToken = async (token) => {
  const octokit = new Octokit({
    auth: token
  });

  const repos = [];
  try {
    const installations = await octokit.request('GET /user/installations', {});
    for (const installation of installations.data.installations) {
      const installation_id = installation.id;
      const installationRepos = await octokit.request(`GET /user/installations/${installation_id}/repositories`, {
        installation_id
      });
      installationRepos.data.repositories.forEach(repo => {
        repos.push(repo);
      });
    }
    return repos;
  } catch(e) {
    console.log(e.message);
  }
}

const createWebhook = async (token, webhookURL, user, fullRepo) => {
  const octokit = new Octokit({
    auth: token
  });
  let [owner, repo] = fullRepo.split("/");
  
  try {
    const response = await octokit.request('POST /repos/{owner}/{repo}/hooks', {
      owner: owner,
      repo: repo,
      name: 'web',
      active: true,
      events: [
        'push'
      ],
      config: {
        url: webhookURL,
        content_type: 'json',
        insecure_ssl: '0'
      }
    });
    return response.data.id;
  } catch(e) {
    console.log({githubFailed: e.message});
    throw new Error(`{githubFailed: ${e.message}}`);
  }
}

const deleteWebhook = async (token, fullRepo, hookId) => {
  const octokit = new Octokit({
    auth: token
  });
  let [owner, repo] = fullRepo.split("/");
  
  try {
    await octokit.request('DELETE /repos/{owner}/{repo}/hooks/{hook_id}', {
      owner: owner,
      repo: repo,
      hook_id: hookId
    });
  } catch(e) {
    console.log({githubFailed: e.message});
    throw new Error(`{githubFailed: ${e.message}}`);
  }
}

const getCommits = async ({token, userLogin, repo}) => {
  const octokit = new Octokit({
    auth: token
  });
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: userLogin,
      repo: repo,
    });
    return response.data;
  } catch(e) {
    console.log(e.message);
  }
}

const getBranches = async (token, fullRepo) => {
  const octokit = new Octokit({
    auth: token
  });
  let [owner, repo] = fullRepo.split("/");
  
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
      owner: owner,
      repo: repo,
    });
    const branches = response.data;

    return branches
  } catch(e) {
    console.log({githubFailed: e.message});
    throw new Error(`{githubFailed: ${e.message}}`);
  }
}

const getLastBranchCommit = async ({token, userLogin, repo, branch}) => {

  const octokit = new Octokit({
    auth: token
  });
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/commits/{branch}', {
      owner: userLogin,
      repo: repo,
      branch: branch,
    });
    return response.data;
  } catch(e) {
    console.log(e.message);
    throw e;
  }
}

const refreshTokens = async ({refreshToken}) => {
  const refreshURL = `https://github.com/login/oauth/access_token?client_id=${process.env.Client_ID}&client_secret=${process.env.Client_secret}&grant_type=refresh_token&refresh_token=${refreshToken}`
  try {
    const response = await axios.post(refreshURL);
    return response.data;
  } catch (e) {
    console.log('Error refreshing github token: ', e.message);
    throw e;
  }
}

const getContributors = async ({token, owner, repo}) => {
  const octokit = new Octokit({
    auth: token
  });

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
      owner,
      repo
    });
    return response.data;
  } catch(e) {
    console.log(e.message);
    throw e;
  }
}

const githubCalls = {
  getAccessToken,
  getUserInfo,
  getReposByToken,
  createWebhook,
  getCommits,
  getBranches,
  getLastBranchCommit,
  refreshTokens,
  getContributors,
  deleteWebhook
};

export default githubCalls;